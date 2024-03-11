<template>
  <div class="m-t-30px w-100%">
    <el-card shadow="always" :body-style="{ padding: '0px',width:'100%',boxSizing:'border-box' }">
    <!-- card body -->
    <!-- <el-upload action="" ref="upload" :on-remove="handleRemove" :auto-upload="false" :limit="1" :on-exceed="handleExceed"
      v-model:file-list="fileList">
      <template #trigger><el-button size="small" type="primary">select file</el-button></template>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="handleUpload">upload to server</el-button>
      <template #tip>
        <div class="el-upload__tip">jpg/png files with a size less than 500kb</div>
      </template>
    </el-upload> -->
     <div class="UserCoverEditor">
      <div class="UserCoverGuide bg-#9196a1 overflow-hidden w-h-100">
        <ul class="swiper">
          <li class="swiper-item"></li>
        </ul>
        <div class="UserCoverGuide-inner float-right p-24px">
          <button type="button"  class="bg-#9196a1 color-#c4c7ce outline-none cursor-pointer border-1px border-style-solid border-#c4c7ce p-12px border-rd-3px" @click="">
          
              <div class="i-mingcute:camera-2-line w-1em h-1em inline-block align-text-top m-r-3px"></div>
            <span>上传封面图片</span>
          </button>
          <div class="ip bg-#7f848d m-t-40px color-#fff  p-4px font-s-14 text-center">
            <div class="i-mingcute:location-fill w-1em h-1em inline-block m-r-2px align-text-bottom"></div>
            <span>ip归属地未知</span>
          </div>
        </div>
      </div>
      <div class="UserWrapper m-l-30px m-r-30px m-b-24px">
         <div class="wrapper_photo border-4px border-#ffff top--60px border-style-solid border-rd-8px">
             <img class="w-160px h-160px border-rd-8px " src="/src/assets/images/people/avator.jpg" alt="">
         </div>
         <div class="profile m-l-248px">
          <div class="profile_content  overflow-hidden p-l-16px p-t-12px">
            <h1>用户xxxx</h1>
            <div></div>
           <div class="profile_footer flex  items-center  ">
            
            <button id="custom-btn" class="color-#9196a1 outline-none cursor-pointer bg-#fff font-s-14 relative">
              <div class="i-mingcute:down-line w-1em h-1em  inline-block align-text-top"></div>
              查看详细资料</button>
              <div class="editButton absolute bottom-0 right-0">
                <el-button  plain size="default" @click="">编辑个人资料</el-button>
                
              </div>
           </div>
          </div>
         </div>
      </div>
     </div>
    </el-card>
    <div class="profile-main flex">
    <div class="profile-left ">
      <el-card shadow="always" :body-style="{ padding: '10px' }">

      <!-- card body -->
      <TabLine @click-tab="setCurrent"  :tabList="tabList" tab-margin="0 5px 5px"/>
      <ListShortCut  :current="currentList"/>
      </el-card>
      
    </div>
    <div class="profile-right flex-1">
      <el-card shadow="always" :body-style="{ padding: '10px' }">

</el-card>
    </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import axios from 'S/utils/initAxios';
import type { UploadUserFile } from 'element-plus';
import sparkMD5 from 'spark-md5'
import { ref,onMounted } from 'vue';
import TabLine from 'S/components/TabLine.vue';
import ListShortCut from '../components/ListShortCut.vue';


declare type TabItem = {
  name: string;
  label: string;
  count?:number;
}

const tabList:TabItem[] = [
  { name: '动态', label: 'trends' },
  { name: '回答', label: 'answer' },
  { name: '视频', label: 'video',count:0 },
  { name: '提问', label: 'question',count:8 },
  { name: '文章', label: 'article',count:6 },
  { name: '专栏', label: 'column',count:10 },
  { name: '想法', label: 'idea',count:101 },
  { name: '收藏', label: 'collect' },
  { name: '关注', label: 'follow' }

]
const currentList = ref<TabItem>()

const setCurrent = (label: string) => {
  currentList.value = tabList.find(item=>item.label === label)|| tabList[0]
}

const fileList = ref<UploadUserFile[]>([])
const fileMd5 = ref()
const chunkList = ref<Blob[]>([])
const handleRemove = (file: any, fileList: any) => {

}
const handleExceed = (files: any, fileList: any) => {

}
const genChunk = (file: UploadUserFile, chunkSize = 1024 * 1024) => {
  const _fileList: Blob[] = []
  if (file.raw) {
    for (let i = 0; i < file.raw.size; i += chunkSize) {
      _fileList.push(file.raw.slice(i, i + chunkSize))
    }
  }
  return _fileList
}
const handleUpload = () => {
    chunkList.value = genChunk(fileList.value[0])
   const hash = new sparkMD5.ArrayBuffer()
   const fileReader = new FileReader()
   fileReader.onload = (e: any) => {
     hash.append(e.target.result)
     fileMd5.value = hash.end(false)
     console.log(fileMd5.value);
     upload(0)
   }
   if(fileList.value.length  && fileList.value[0].raw) {
     fileReader.readAsArrayBuffer(fileList.value[0].raw)
     
     
   }
}
enum FormDataKey {
  chunk = 'chunk',
  index = 'index',
  fileName = 'fileName',
  name = 'name',
  extname = 'extname'
}
const genFile_FormData = (...args:any[]) => {
  const formData = new FormData()
  args.forEach((item,index)=>{
    formData.append(Object.keys(FormDataKey)[index],item)
  })
  return formData
}
const upload =async (index:number)=> {
  if(index === chunkList.value.length) {
    mergeFile()
    return;
  }
  const formData =  genFile_FormData(chunkList.value[index],index.toString(),fileMd5.value,`${index} @ ${fileMd5.value}`, 'png')
 const {data} = await axios.post('/people/upload',formData,{
    headers:{
      'Content-Type':'mutipart/form-data'
    }
  })
   if(data.code===200) {
    console.log(chunkList.value.length);
    
    upload(index+1)
   }
}
const  mergeFile=async ()=>{
 const result = await axios.post('/people/mergeFile',{fileName:fileMd5.value,extname:'png'})
 console.log(result);
 
}
 onMounted(() => {
  axios.get('/people/getInfo').then(res=>{
    console.log(res)
  })
 })
</script>

<style scoped lang="scss">
.UserCoverEditor {
  .UserCoverGuide {
    .swiper {
      li {
        background: url('/src/assets/images/people/bg.jpg')  no-repeat;
        object-fit: cover;
      }
    }
  }
  .UserWrapper {
    position: relative;
     
    .wrapper_photo {
      position: absolute;
    }
    .profile_content::before {
      content: ' ';
      display: block;

    }
    .UserCoverGuide-inner,.profile_footer {
      #custom-btn {
        border: 1px solid transparent;
      }
    }
  }

}
.profile-main {
  min-height: 300px;
  ::v-deep(.el-card) {
    height: 100%;
    width: 100%;
  }
  .profile-left{
    margin: 5px 5px 0 0;
    flex: 2;
  }
  .profile-right{
     margin: 5px 0 0 5px;
  } 
}
</style>