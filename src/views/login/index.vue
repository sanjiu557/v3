<template>
  <div class="xm-login">
    <div class="xm-login__card">
      <div class="xm-login__inner">
        <div class="xm-login__left">
          <div class="scan-qrCode flex  flex-col  flex-items-center flex-justify-center">
            <div class="font-700">打开APP</div>
            <div class="mt-10px bg-co">在「我的页」右上角打开扫一扫</div>
            <div class="login-qrCode mt-35px">
              <el-image src="src/assets/images/login/qrCode.png" fit="fill"></el-image>

            </div>
          </div>
          <div class="footer-link mb-30px">
            <el-button round>打开APP</el-button>
            <el-button round>开通机构号</el-button>
            <el-button round>无障碍模式</el-button>
          </div>
        </div>
        <div class="xm-login__right">
          <div class="xm-login__tabLine">
            <div class="tab-item cursor-pointer" :class="{ tabLine: item.type === lgType }" v-for="item in tabList"
              @click="changeLgType(item?.type)" :key="item?.type">{{ item?.name }}</div>
          </div>
          <div class="xm-login__form">
            <div class="login-verifyCode" v-show="lgType === 'account'">


              <div class="xm-login--username">
                <el-input type="tel" v-model="loginForm.phone" placeholder="手机号" input-style="border:none;">
                  <template #prepend>
                    <el-select v-model="phoneNumber" :placeholder="`${china?.chinese_name} +${china?.phone_code}`"
                      style="width:125px;" :suffix-icon="SelectIcon" :suffix-transition="false">
                      <el-option :label="`${item.chinese_name}  +${item.phone_code}`" :value="item.phone_code"
                        v-for="item in countryList" />
                    </el-select>
                  </template>
                </el-input>
              </div>
              <div class="xm-login--password">
                <el-input size="default" v-model="loginForm.verifyCode" clearable placeholder="输入6位短信验证码">
                  <template #append>
                    <el-button type="primary" size="default" @click="getVerifyCode" :disabled="isCountDown">{{
                      isCountDown ? `倒计时${countDown}秒` : '获取验证码' }}</el-button>
                  </template>
                </el-input>
              </div>
              <div class="xm-login__btn">
                <el-button type="primary" size="default" @click="loginOrenRoll" :loading="loginLoading">登录/注册</el-button>

              </div>
            </div>
            <div class="login-password" v-show="lgType === 'password'">
              <div class="xm-login--phone">
                <el-input size="default" placeholder="手机号或邮箱"></el-input>
              </div>
              <div class="xm-login--phone">
                <el-input size="default" placeholder="密码">
                  <template #suffix>
                    <div class="i-mingcute:eye-2-line w-1em h-1em cursor-pointer"></div>
                  </template>
                </el-input>
              </div>
              <div class="xm-login__btn ">
                <el-button type="primary" size="default" @click="login" :loading="loginLoading">登录</el-button>

              </div>
            </div>
          </div>
          <div class="xm-login__footer">
            <div class="divide-line">
              <div class="ll"></div>
              <div class="lm">其他登录方式</div>
              <div class="lr"></div>
            </div>
            <div class="other-methods">
              <div class="lg-method-other" v-for="item in otherLoginList">
                <el-button circle>
                  <template #icon>
                    <div class="w-1em h-1em" :class="item.icon" :style="item.iconStyle"></div>
                  </template>

                </el-button>
              </div>


            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">


import { ref, defineComponent, h, computed, watch, onMounted, onUnmounted } from 'vue';
import axios from 'S/utils/initAxios'
import {setToken} from 'S/utils/index'
import { ElMessage } from 'element-plus';
import {useRouter,useRoute} from 'vue-router'

const tabList = [
  { name: '验证码登录', type: 'account' },
  { name: '密码登录', type: 'password' },
]
type OtherLoginTypes = {
  icon: string,
  type: string,
  iconStyle?: { color: string }
}
interface countryInfo {
  chinese_name: string,
  country_code: string,
  english_name: string,
  phone_code: string
}
type LoginInfo = {
  phone: string|number,
  verifyCode: string|number,
}
const otherLoginList: OtherLoginTypes[] = [
  { icon: 'i-mingcute:wechat-fill', type: 'wechat', iconStyle: { color: '#07c160' } },
  { icon: 'i-mingcute:qq-fill', type: 'qq', iconStyle: { color: "#50c8fd" } },
  { icon: 'i-mingcute:weibo-fill', type: 'weibo', iconStyle: { color: "#fb6622" } },
]

let timer: ReturnType<typeof setInterval> | undefined;

const router = useRouter()

const countryList = ref<countryInfo[]>([])
const loginForm = ref<LoginInfo>({phone:'',verifyCode:''})
const lgType = ref('account')
const countDown = ref(60)
const loginLoading = ref(false)
const phoneNumber = ref('')

const isCountDown = computed(() => countDown.value > 0 && countDown.value < 60)
const china = computed(() => countryList.value.find((item) => item.phone_code === '86') ?? countryList.value[0])
watch(isCountDown, (newV) => {
  if (!newV) {
    clearInterval(timer)
    countDown.value = 60
  }
})
const SelectIcon = defineComponent({
  setup() {
    return () => {
      return h('div', { class: 'i-mingcute-more-2-fill w-1em h-1em ' })
    }
  }
})

onMounted(() => {

  axios.get('/country').then(res => {
    if (res.status === 200) {
    
      countryList.value = res.data.countryList.sort((a: countryInfo, b: countryInfo) => ~b.phone_code - ~a.phone_code)
    }
  })
})
onUnmounted(() => {
  clearInterval(timer)
})


const changeLgType = (type: string = 'account') => {
  lgType.value = type

}
const genCountDown = ()=>{
  timer = setInterval(() => { countDown.value-- }, 1000);
}
const getVerifyCode = () => {
  genCountDown();
  axios.get(`/getVerifyCode?phone=${loginForm.value.phone}`).then(res=>{
    if(res.status === 200 && res.data.code ===200) {
      loginForm.value.verifyCode = res.data.verifyCode
    }
  })
}

const loginOrenRoll = () => {
  loginLoading.value = true
  axios.post('/login',loginForm.value).then(res => {
    if(res.status === 200) {
      
       setToken(res.data)
        router.push('/author')
        ElMessage.success('登录成功')
        loginLoading.value = false
    }else {

    }

  })
}
const login = () => {
 axios.post('/test').then(res=>{
  console.log(res);
  
 })
}

</script>

<style scoped lang="scss">
.xm-login {
  height: 100vh;
  overflow: hidden;
  background-color: $base-bg-color;
  background-image: url('../../assets/images/login/login_bg.png');

  &__card {
    width: 700px;
    height: 430px;
    background-color: #fff;
    // border-radius: 4px;
    box-shadow: 0 21px 41px;
    position: absolute;
    left: 75%;
    top: 50%;

    transform: translate(-50%, -50%);
  }

  &__inner,
  &__left,
  &__right {
    height: 100%;
  }

  &__inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  }

  &__left {
    flex: 1;
    border-right: 1px solid #ccc;
    display: flex;
    flex-direction: column;
    // justify-content: center;
    align-items: center;
    font-size: 16px;

    .scan-qrCode {
      flex: 1;
    }

    & .scan-qrCode div:nth-child(2) {
      font-size: 14px;
      color: #373a40;
    }

    .footer-link {
      display: flex;

      .el-button+.el-button {
        margin-left: 8px;
      }

      button {
        flex: 1;
        font-size: 12px;
      }
    }

    .login-qrCode {
      width: 120px;
      height: 120px;
      border: 1px solid #ebeced;
    }
  }

  &__right {
    flex: 1;
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    padding: 10px;
  }

  &__tabLine {
    display: flex;
    // flex: 1;
    padding: 12px 0;

    .tab-item {
      padding: 5px;

    }

    .tabLine {
      font-weight: 700;
      margin-right: 5px;
    }

    .tabLine::after {
      content: '';
      display: block;
      height: 3px;
      background-color: #1772f6;
      width: 100%;
      margin-top: 8px;

    }
  }

  &__form {
    flex: 2;

    ::v-deep(.el-input__wrapper) {
      border: none;
    }

    .el-input {
      margin: 16px 0;
    }
  }

  &__btn {
    width: 100%;
    margin-top: 16px;

    .el-button {
      width: 100%;
    }
  }

  &__footer {
    flex: 1;

    .divide-line {
      display: flex;
      align-items: center;
      color: #9196aa;
      font-size: 13px;

      .lm {
        margin: 0 8px;
      }

      .ll,
      .lr {
        height: 1px;
        transform: scale(1, 0.5);
        flex: 1;
        background-color: #ebeced;
      }
    }

    .other-methods {
      margin: 20px 30px 0;
      display: flex;

      .lg-method-other {
        flex: 1;

        button {
          display: block;
          margin: 0 auto;
        }
      }
    }
  }

}

// @include b(login) {
//   @include bfc;
//   height: 100vh;
//   background-color: $base-bg-color;
//   position: relative;

// }
// @include e(card) {
//   width: 400px;
//   height: 300px;
//   background-color: #fff;
//   border-radius: 4px;
//   box-shadow: 0 21px 41px rgba(0, 0, 0, .3);
//   position: absolute;
//   left: 50%;
//   top: 50%;
//   transform: translate(-50%, -50%);
//   display: flex;
//   justify-content: center;
// }</style>