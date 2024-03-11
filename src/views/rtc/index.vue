<template>
  <div class="relative w-h-100">
    <!-- <el-select v-model="selectMedia" @change="handleChange">
      <el-option v-for="item in audioInput" :key="item.deviceId" :label="item.label" :value="item.deviceId">
      </el-option>
    </el-select> -->
    <div class="container" v-if="isEntered">
      <div class="flex justify-around border-1 border-solid ">

        <div class="videoArea relative ">
          <div class="localVideo absolute bottom-20px right-30px aspect-ratio-video">
            <video class="aspect-ratio-video" id="localVideo" autoplay></video>
          </div>
          <div class="remoteVideo w-h-100 aspect-ratio-4/3">
            <video class="aspect-ratio-4/3 w-h-100" id="remoteVideo" autoplay></video>
          </div>
        </div>

        <div class="flex-1 messageList relative  translate-0px m-b-20px ">
          <ul>
            <li v-for="(item, index) in MessageBox" :key="index">{{ item.msg }}</li>
          </ul>

          <div class="sendMessage fixed bottom-0 w-100% p10px">
            <div class="m-b-5px relative h-20px bg-transparent b-rd-3px overflow-hidden">
              <div v-for="item in scrollMsg" class="h-20px" :class="{ scroll: isScroll && scrollMsg.length > 1 }">{{ item.msg
              }}</div>
              <!-- <div class="h-20px bg-red absolute bottom-0  z-0"></div> -->
            </div>
            <el-input v-model="form.rtcMessageLocal" placeholder="" size="default" clearable>
              <template #append>
                <el-button type="primary" size="default" @click="sendMessageRtcChannel">发送</el-button>

              </template>
            </el-input>

          </div>
        </div>

      </div>

      <div class="messageArea">
        <template v-for="(item, index) in roomUserList" :key="index">
          <div v-if="item !== userForm.userId">

            <el-tag>{{ item }}</el-tag>
            <el-button type="primary" size="default" @click="call({ targetUid: item })">通话</el-button>
          </div>
        </template>

      </div>
      <el-button type="primary" size="default" @click="changeVideo">change</el-button>
      <el-button type="primary" size="default" @click="getDisplayMedia">切换摄像头</el-button>

    </div>
    <div v-else class="flex infoCard__edit   b-rd-6px border-2px border-transparent absolute top-50% left-50%">
      <div class="relative p-20px bg-#fff m-t-20px">
        <div class="layer absolute w-90% h-100% z--1 bg-#e3e5e7 left-50% top-0 b-rd-6px"></div>
        <div class="layer-bg absolute w-80% h-100% z--2 bg-#f1f2f3 left-50% top-0 b-rd-6px"></div>
        <el-form :model="userForm" :rules="formRules" ref="userInfoForm" label-width="80px" :inline="false" size="default">
          <el-row>
            <el-form-item label="用户ID" prop='userId' class="w-100%">
              <el-input v-model="userForm.userId"></el-input>
            </el-form-item>
          </el-row>

          <el-row>
            <el-form-item label="房间ID" prop="roomId" class="w-100%">
              <el-input v-model="userForm.roomId"></el-input>
            </el-form-item>
          </el-row>

          <el-row>
            <el-form-item label="昵称" prop="nickname" class="w-100%">
              <el-input v-model="userForm.nickname"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="麦克风" prop="audioId">
              <el-select v-model="userForm.audioId" :fit-input-width="true" value-key="deviceId" placeholder="" clearable
                filterable>
                <el-option v-for="item in deviceList.audioInput" :key="item.deviceId" :label="item.label"
                  :value="item.deviceId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="摄像头" prop="videoId">
              <el-select v-model="userForm.videoId" :fit-input-width="true" value-key="deviceId" placeholder="" clearable
                filterable>
                <el-option v-for="item in deviceList.videoInput" :key="item.deviceId" :label="item.label"
                  :value="item.deviceId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="分辨率" prop="resolutionRatio">
              <el-select v-model="userForm.resolutionRatio" value-key="value" placeholder="" clearable filterable>
                <el-option v-for="item in deviceList.resolutionRatios" :key="item.id" :label="item.value"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item>
              <el-button type="primary" @click="initConnection(userInfoForm)">确认</el-button>
            </el-form-item>
          </el-row>
        </el-form>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref, toRaw } from 'vue';
import type { FormRules,FormInstance } from 'element-plus'
import { ref, reactive, onMounted, watch, onUnmounted } from 'vue'
import genSocket from 'S/utils/socket-client'
import { ElMessage } from 'element-plus';
// import _MessageBox from 'element-plus/es/components/message-box';

type initCallee = (localUid: string, fromUid: string) => void
type initCaller = (callerId: string, calleeId: string) => void
type initPC = (obj:typeof userForm) => void

type onPCEvent = (rtc: Ref<RTCPeerConnection>, userId: string, roomId: string) => void
  
const PeerConnection = window.RTCPeerConnection;


const isScroll = ref(false)

const userInfoForm = ref<FormInstance>()
const selectMedia = ref('')
const roomUserList = ref()
// const currentUser = ref<{ userId: string, roomId: string, nickname?: string }>({
//   userId: '',
//   roomId: ''
// })
const MessageBox = ref<any[]>([])
const scrollMsg = ref<{msg:string}[]>([
])
const timer = ref<any>()
const isEntered = ref(false)
const form = reactive({
  rtcMessageLocal: '',
  rtcMessageRemote: ''
})
const userForm = reactive({
  userId: '',
  roomId: '',
  nickname: '',
  resolutionRatio: '',
  audioId: '',
  videoId: ''
})

const deviceList = reactive<{ audioInput: MediaDeviceInfo[], videoInput: MediaDeviceInfo[], resolutionRatios: Record<'value' | 'id' | 'type', string>[] }>({
  audioInput: [],
  videoInput: [],
  resolutionRatios: [
    { value: '1920 * 1080', id: '1', type: 'default' },
    { value: '1280 * 720', id: '2', type: 'low' },
    { value: '640 * 480', id: '3', type: 'lower' },
    { value: '320 * 240', id: '4', type: 'lowest' }
  ]
})

const formRules = reactive({
  userId: [
    { required: true, message: '请输入用户ID', trigger: 'blur' },
    { min: 3, max: 5, message: '长度在 3 到 10 个字符', trigger: 'blur' }
  ],
  roomId: [
    { required: true, message: '请输入房间ID', trigger: 'blur' }
  ],
  audioId: [
    { required: true, message: '请选择音频设备', trigger: 'change' }
  ],
  videoId: [
    { required: true, message: '请选择摄像头', trigger: 'change' }
  ],
  resolutionRatio: [
    { required: true, message: '请选择分辨率', trigger: 'change' }
  ]
})

const RtcChannel = ref<RTCDataChannel>()
const localRtcPC = ref<RTCPeerConnection>()
const constraints = ref<MediaStreamConstraints>({
  audio: true,
  video: true
})
const userMap = new Map() // 维护 会议室人员关系
const socket: { socketIo: any } = reactive({
  socketIo: {}
})
// const scrollInfo = computed(()=>{
//   return MessageBox.value.slice(0,2)
// })
// const streamSrc = ref()
// const mediaVideo = ref()
// const getDisplayStream =() => {
//   navigator.mediaDevices.getDisplayMedia({video:true}).then(stream=>{
//     mediaVideo.value.srcObject = stream
//     // console.log(mediaVideo);

//   })
// }
const getParams = (query: string) => {
  const urlParams = new URLSearchParams(window.location.hash.split('?')[1])

  if (urlParams.has(query)) {
    return urlParams.get(query) || ''
  } else {
    return;
  }

}

watch(()=>scrollMsg.value.length,(newV,oldV)=>{
  if(newV>oldV) {
    console.log('push 新数据了',newV,oldV);
    
    scroll()
  }
})

const setLocalDomVideos = async (domId: string, stream: any) => {
  const video: HTMLVideoElement = document.querySelector(domId)!

  const videoStream = video.srcObject as MediaStream
  if (videoStream) {
    videoStream.getAudioTracks().forEach(track => {
      track.stop()
    })
    videoStream.getVideoTracks().forEach(track => {
      track.stop()
    })
  }
  video.srcObject = stream
  video.muted = true
}

const setRemoteDomVideos = (domId: string, track: MediaStreamTrack) => {
  const video: HTMLVideoElement = document.querySelector(domId)!
  let videoStream = video.srcObject as MediaStream
  console.dir(video);

  if (videoStream) {
    videoStream.addTrack(track)
  } else {
    let newStream = new MediaStream()
    newStream.addTrack(track)
    video.srcObject = newStream
    video.muted = true
  }

}

const handleChange = () => {
  console.log(selectMedia.value);
}

const init:initPC = async ({userId,roomId,nickname}) => {
  socket.socketIo = genSocket({ roomId, userId, nickname })
  socket.socketIo.on('connect', () => {
    console.log('socket 连接成功');
    // socket.socketIo.emit('roomUserList', { roomId: getParams(roomId) })
  })

  socket.socketIo.on('roomUserList', (e: any) => {

    roomUserList.value = e

  })
  socket.socketIo.on('msg', async (e: any) => {



    // if (e.type == 'join' || e.type == 'leave') {
    //   socket.socketIo.emit('roomUserList', { roomId: getParams(roomId) })
    // }
    switch (e.type) {
      case 'join':
      case 'leave':
        MessageBox.value.push(e)
        scrollMsg.value.push(e)
        socket.socketIo.emit('roomUserList', { roomId: userForm.roomId });
        break;
      case 'offline':
        ElMessage.info(`用户 ${e.data.targetUId}不在线,稍后再试`)  
      break;
      case 'call':
        await onCall(e); break;
      case 'offer':
        // 接收方处理发送方的offer
        await onRemoteOffer(e.data.userId, e.data.offer); break;
      case 'answer':
        await onRemoteAnswer(e.data.userId, e.data.sdp); break;
      case 'candidate':
        console.log('addIceCandidate');

        localRtcPC.value!.addIceCandidate(e.data.candidate)
          .then(() => {
            console.log('addIceCandidate success');
          })
          .catch((err) => {
            console.error('addIceCandidate error', err);

          })
        break;
      case 'message':
        MessageBox.value.push(e.data)

        break;
      default:
        // console.log(e);
        break;
    }
    socket.socketIo.on('error', () => {
      console.log('err');
    })
  })

  // initCallee(userId, roomId, name)
}

const getLocalMedia = async (constrain: any) => {
  return await navigator.mediaDevices.getUserMedia(constrain)
}


// 初始化被呼叫方
const initCallee: initCallee = async (userId, targetUId) => {
  localRtcPC.value = new PeerConnection()

  userMap.set(`${userId}--${targetUId}`, localRtcPC.value)

  const localStream = await getLocalMedia(constraints.value)
  for (const track of localStream.getTracks()) {
    localRtcPC.value.addTrack(track)
  }
  await setLocalDomVideos('#localVideo', localStream)
  onPCEvent(localRtcPC, userId, targetUId)
}
//  初始化呼叫方
// calleeId 远程id  callerId 本地id
const initCaller: initCaller = async (calleeId, callerId) => {
  const mapSender = []
  localRtcPC.value = new PeerConnection()

  userMap.set(`${callerId}--${calleeId}`, localRtcPC.value)

  let localStream = await getLocalMedia(constraints.value)
  //  触发icecandidate事件
  for (const track of localStream.getTracks()) {
    // console.log(localRtcPC.value.addTrack(track));

    mapSender.push(localRtcPC.value.addTrack(track))
  }
  await setLocalDomVideos('#localVideo', localStream)
  onPCEvent(localRtcPC, callerId, calleeId)
  let offer = await localRtcPC.value.createOffer({ iceRestart: false })

  console.log('local-setLocalDescription');

  await localRtcPC.value.setLocalDescription(offer)
  let params = { targetUId: calleeId, userId: callerId, offer: offer }
  socket.socketIo.emit('offer', params)

}

const onPCEvent: onPCEvent = (rtc, localUid, fromUid) => {

  RtcChannel.value = rtc.value.createDataChannel(`${localUid} chat`)
  rtc.value.ontrack = (e) => {

    setRemoteDomVideos('#remoteVideo', e.track)
  }
  rtc.value.onnegotiationneeded = (e) => {
    console.log('重新协商', e);

  }
  rtc.value.ondatachannel = (e: RTCDataChannelEvent) => {
    e.channel.onopen = () => {
      console.log('data- channel - open');

    }
    e.channel.onmessage = (e) => {
      console.log('data- channel - message', e.data);

      form.rtcMessageRemote = e.data
    }
    e.channel.onclose = () => {
      console.log('data- channel - close');

    }
  }
  rtc.value.onicecandidate = (e: RTCPeerConnectionIceEvent) => {
    console.log('ice candidate 事件', e);

    if (e.candidate) {
      socket.socketIo.emit('candidate', { targetUId: fromUid, userId: localUid, candidate: e.candidate })
    } else {
      console.log('结束候选');

    }
  }
}

const sendMessageRtcChannel = () => {
  if (!RtcChannel.value) {
    ElMessage.warning('请先建立webrtc连接')
  } else {
    RtcChannel.value.send(form.rtcMessageLocal)
    socket.socketIo.emit('message', { userId: userForm.userId, message: form.rtcMessageLocal })
    form.rtcMessageLocal = ''
  }
}

const call = (msg: { targetUid: string }) => {


  initCaller(msg.targetUid, userForm.userId)
  socket.socketIo.emit('call', { userId: userForm.userId || '', targetUId: msg.targetUid })

}

const onCall = async (e: any) => {
  console.log('远程呼叫', e);
  await initCallee(e.data.userId, e.data.targetUId)

}
// 被呼叫方接收offer，setRemoteDescription，创建answer
const onRemoteOffer = async (fromUid: string, offer: RTCSessionDescription) => {
  console.log('remote ---setRemoteDescription');

  await localRtcPC.value!.setRemoteDescription(offer)
  const answer = await localRtcPC.value!.createAnswer()
  console.log('remote ---setLocalDescription');

  await localRtcPC.value!.setLocalDescription(answer)
  let params = {
    targetUId: fromUid,
    userId: userForm.userId,
    sdp: answer
  }
  socket.socketIo.emit('answer', params)
}
const onRemoteAnswer = async (fromUid: string, answer: RTCSessionDescription) => {
  console.log('local-setRemoteDescription');

  await localRtcPC.value!.setRemoteDescription(answer)
}

const changeVideo = () => {
  const senders = localRtcPC.value?.getSenders()
  const videoSender = senders?.filter(sender => sender?.track?.kind === 'video')[0]
  if (videoSender) {
    videoSender.track!.enabled = !videoSender.track!.enabled
  } else {
    ElMessage.warning('请先建立webrtc连接')
  }

}

const getDisplayMedia = async () => {
  const mediaStream = await navigator.mediaDevices.getDisplayMedia({
    video: true,
    audio: true
  })
  // 设置本地视频流
  await setLocalDomVideos('#localVideo', mediaStream)
  const sender = localRtcPC.value?.getSenders().find(sender => sender.track?.kind === 'video')
  // 替换发送给远端的视频流
  await sender?.replaceTrack(mediaStream.getVideoTracks()[0])

}

const initConnection =async  (userInfoForm:FormInstance|undefined)=>{
  if(!userInfoForm) return 
 await  userInfoForm.validate((valid) => {
    if(valid) {
      isEntered.value = true 
      sessionStorage.setItem('meetState', JSON.stringify(isEntered.value))
      sessionStorage.setItem('userInfo',JSON.stringify(toRaw(userForm)))
       init(userForm)
    }else {
      ElMessage.warning('请填写信息')
    }
  })
}

const quit = () => {
  const { userId, roomId } = userForm
  socket.socketIo.emit('leave', { userId, roomId })
}

const scroll =async (delay = 500) => {
  if(scrollMsg.value.length <= 2) return;
  isScroll.value = true
  const timer = setTimeout(() => {
    // scrollMsg.value.push(scrollMsg.value[0])
      scrollMsg.value.shift()
      isScroll.value = false
    
  }, delay)
  return clearTimeout.bind(null, timer)
}



onMounted(async () => {
  // setInterval(scroll, 1000)
  setInterval(()=>scrollMsg.value.push({  msg: `${userForm.nickname}离开了房间` }),1000)
    if(sessionStorage.getItem('meetState')) {
          isEntered.value = true
         Object.assign(userForm,JSON.parse(sessionStorage.getItem('userInfo') as string))
      
         
       await  init(userForm)
      //  socket.socketIo.emit('join')
         
          return;
    }  
  
 

  navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(stream => {
    stream.getTracks().forEach(track => {
      track.stop()
    })
    navigator.mediaDevices.enumerateDevices().then(devices => {

      deviceList.audioInput = devices.filter(device => device.kind === 'audioinput')
      deviceList.videoInput = devices.filter(device => device.kind === 'videoinput')
      userForm.audioId = deviceList.audioInput.find(device => device.deviceId === 'default')?.deviceId ?? deviceList.audioInput[0]?.deviceId
      userForm.videoId = deviceList.videoInput.find(device => device.deviceId === 'default')?.deviceId ?? deviceList.videoInput[0]?.deviceId
      userForm.resolutionRatio = deviceList.resolutionRatios.find(ratio => ratio?.type === 'default')?.value ?? ''
    })

  })


  // getDisplayStream()
})
onUnmounted(() => {  
  
 socket.socketIo.emit('leave', { userId: userForm.userId, roomId: userForm.roomId,nickname:userForm.nickname })
  sessionStorage.clear()
})
//   onBeforeUnmount(() => {
//   console.log('leave');
//   const {userId, roomId} = currentUser.value
//   socket.socketIo.emit('leave', {userId, roomId})
//  })

</script>

<style scoped lang="scss">
.infoCard__edit {
  // transform: translate3d(-50%,-50%,0);
  transform: translateX(-50%) translateY(-50%);
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.03);

  .layer {
    transform: translate(-50%, 6px);
  }

  .layer-bg {
    transform: translate(-50%, 12px);
  }
}

.scroll {
  transform: translateY(-20px);
  transition: transform 0.5s;
}

.videoArea {
aspect-ratio: 16/9;
  padding: 0 15px;
  flex: 2;

  .localVideo,
  .remoteVideo {
    margin: 20px 0;
    border: 2px solid #000;
      video {
        object-fit: cover;
      }
    //  flex: 1;
    #localVideo  {
      width: 400px;
      height: 300px;
    }
  }
}

.sendMessage {
  box-sizing: border-box;
}

.father {
  grid-template-rows: repeat(3, 100px);
  grid-template-columns: repeat(5, 100px);
  gap: 50px;
  grid-template-areas:
    ". header header . ."
    "content content content . ."
    ". . footer footer .";
  // place-items: center;
  animation: visible 2s ease-in-out .5s forwards;

  div {
    border: 1px solid #000;
  }

  .header {
    grid-area: header;
  }

  .content {
    grid-area: content;
  }

  .footer {
    grid-area: footer;
  }
}

@keyframes visible {
  0% {
    opacity: 0;
  }

  40% {
    opacity: 0.7;
    transform: translateX(30px);
  }

  60% {
    opacity: 0.3;
    transform: translateX(-30px);
  }

  100% {
    opacity: 1;
    transform: translateY(20px);
  }
}</style>