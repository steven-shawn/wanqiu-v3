<template lang="pug">
div#login.container.relative.h-full
  van-nav-bar.text-primary(title="登陆/注册" left-arrow right-text="账号找回" style="color: red!important" @click-right="onRightClick")
  div.content.w-full.h-full.flex.flex-col.items-center.absolute.inset-0.px-4(@click="onToggleTip(false)")
    div.flex.flex-col.justify-center.items-center.pt-20
       img.w-10.h-10(src="@/assets/logo@2x.png")
       p.text-md.text-primary.mt-1 金球体育
    div.login-form.container.rounded-md.bg-white.text-primary.px-4.pb-4.mt-5.box-shadow
      ol.form
          li.form-item.flex.flex-col.border-b.py-2
              p.text-md.py-4 手机号码
              div.flex.items-center
                  //- span.text-xs.mr-2 +86
                  input.bg-transparent.text-md.flex-1(placeholder="请输入手机号" type="number" v-model="user.phone" @input="onCheckInputLength('phone', 11)")
          li.form-item.flex.flex-col.border-b.py-2(v-if="loginType === 1")
              p.text-md.py-4 短信验证码
              div.flex.items-center
                  input.bg-transparent.text-md.flex-1(placeholder="请输入短信验证码" type="number" v-model="user.code" @input="onCheckInputLength('code', 6)")
                  button.w-20.h-6.bg-primary.text-white.text-xs.rounded(@click="onSendCode" :disabled="seconds < 60") {{sendTxt}}
          li.form-item.flex.flex-col.border-b.py-1(v-else)
              p.text-md.py-4 密码
              div.flex.items-center
                  input.bg-transparent.text-md.flex-1(placeholder="请输入密码" maxlength="16" type="password" v-model="user.password")
      div.text-right.mt-1
          span.text-xs(@click.stop="onToggleTip(null)" :class="{'hidden': loginType === 2}") 收不到验证码
          span.text-xs(@click.stop="route" :class="{'hidden': loginType === 1}") 忘记密码
      div.text-xs.float-right.bg-black.bg-opacity-50.inline-block.text-white.p-4.rounded.relative.z-10(v-if="showTip")
          p 收不到验证码可尝试以下方案:
          p 1.通信网络异常请重启手机
          p 2.查看手机设置-信息-黑名单
          p 3.检查是否有安全软件拦截了验证码
    div.login-btn.w-full.h-11.text-center.mt-14.rounded.leading-10.flex-shrink-0(@click="onSubmit")
    div.w-full.h-11.text-center.mt-2.leading-10.flex-shrink-0(
      @click="onChangeLoginType()" :class="loginType === 2 ? 'login-phone' : 'login-pass'")
    //- div.text-xs.text-white.mt-4 未注册手机在验证后将自动登录
    div.text-xs.mt-36.text-white.flex.flex-row.items-center
      input.w-3.h-3.mr-1.bg-red-600(type="checkbox" v-model="checked")
      span.text-primary 我已阅读并接受 
      router-link.text-blue(to="/agreement/user") 《用户协议》
      router-link.text-blue(to="/agreement/privacy") 《隐私协议》
</template>

<script setup lang="ts">
import { RESEND_CODE_TIME, MOBILE_REG, PASSWORD_REG } from "@/config/system.conf"
import { SET_INFO } from "@/store/types.store"
import { NavBar, Notify, Dialog, Toast } from 'vant';

import { ref, reactive, onBeforeUnmount, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

// import Util from '@/utils'
import { _sendCode, _login, _userinfo } from '@/service/modules/user.api'


const initBtnText = '发送验证码'

const store = useStore()
const router = useRouter()

/******** 数据定义 **********/
const checked = ref(true) // 是否同意协议
const loginType = ref(1) // 1手机验证码登录 2密码登录
const showTip = ref(false) // 收不到验证码提示
const seconds = ref(RESEND_CODE_TIME) // 倒计时秒数字
const sendTxt = ref(initBtnText); // 倒计时文字
const user = reactive({ // 用户模型
  phone: '', // 手机号
  code: '', // 验证码
  password: '', // 密码
})
const interval = ref(-1) // 计数器

/********** 生命周期 **************/
onMounted(() => {
  const userInfo = store.state.user.userInfo
  if (userInfo.access_token) {
    router.replace('/home/index')
  }
})

onBeforeUnmount(() => { // 清除计时器
  if (interval.value && interval.value !== -1) {
    clearInterval(interval.value)
  }
})

/*******************方法区 ******************/
// 收不到验证码的提示框
const onToggleTip = (flag: boolean | undefined | null) => {
  if (flag === false) {
    showTip.value = false
  } else {
    showTip.value = !showTip.value
  }
}

const onRightClick = () => {
  Toast('敬请期待')
}

// 长度检查
const onCheckInputLength = (type: string, len: number) => {
  if (user[type].toString().length >= len) {
    user[type] = user[type].toString().substring(0, len)
  }
}
// 登录方式
const onChangeLoginType = () => {
  onToggleTip(false)
  if (loginType.value === 1) {
    loginType.value = 2
  } else {
    loginType.value = 1
  }
}

// 发送验证码
const onSendCode = async () => {
  if (!MOBILE_REG.test(user.phone)) {
    Notify({type: 'danger', message: '手机号码格式不正确'})
  } else { // 倒计时
    interval.value = setInterval(() => {
      sendTxt.value = `重新发送${seconds.value}s`
      seconds.value--
      if (seconds.value < 0) {
        clearInterval(interval.value)
        seconds.value = RESEND_CODE_TIME
        sendTxt.value = initBtnText
      }
    }, 1000)
    await _sendCode(user.phone)
    Notify({type: 'success', message: '发送成功'})
    // if (await _sendCode(user.phone)) { // 如果有数据
    // }
  }
}

const route = () => {
  console.log('rute')
}

// 登录
const onSubmit = async () => {
  if ($checkData()) {
    const data = await _login(loginType.value, user)
    if (data) {
      // console.log(data)
      const token = data.token_type + ' ' + data.access_token
      const info = await _userinfo(token)
      store.commit(`user/${SET_INFO}`, {...data, ...info})
      const notSetLongonPwd = store.getters.info.notSetLongonPwd === 'true'
      if(!notSetLongonPwd) { // 已经设置过密码
        Notify({type: 'success', message: '登录成功'})
        router.replace('/home/index')
      } else { // 没有设置密码
        Dialog.confirm({title: '', message: '恭喜你注册成功,是否立即设置【登陆密码】?'}).then(() => {
          router.replace('/home/index')
          // router.replace('/my/change-password')
        }).catch(() => {
          router.replace('/home/index')
        })
      }
    }
  }
}

// 工具函数，校验数据
const $checkData = () => {
 if(!checked.value) { // 是否同意了条款
    Notify({type: 'danger', message: '请勾选服务协议'})
    return false
  }
  if (!MOBILE_REG.test(user.phone)){ // 校验手机
    Notify({type: 'danger', message:'手机号码格式不正确'})
    return false
  }
  if (loginType.value === 1) { // 验证码登录
    if (!user.code || user.code.toString().length !== 6) { // 校验验证码格式
      Notify({type: 'danger', message:'验证码格式不正确'})
      return false
    }
  } else { // 密码登录
    if(!PASSWORD_REG.test(user.password)) { // 校验密码
      Notify({type: 'danger', message: '密码必须是8-16位字母数字组合'})
      return false
    }
  }
  return true
}

</script>
<style lang="sass">
:root
  --van-nav-bar-text-color: #667885!important
  --van-nav-bar-icon-color: #667885!important
</style>

<style lang="sass" scoped>
#login
  background: #f2f4f6
  .login-btn
      background: url('@/assets/imgs/bg-login@2x.png') no-repeat center center
      background-size: 100%
  .login-phone
    background: url('@/assets/imgs/login-phone@2x.png') no-repeat center center
    background-size: 100% 100%
  .login-pass
    background: url('@/assets/imgs/login-pass@2x.png') no-repeat center center
    background-size: 100% 100%
</style>