<template lang="pug">
div#login.container.relative.h-full
  div.content.w-full.h-full.bg-black.bg-opacity-60.flex.flex-col.items-center.absolute.inset-0.px-4(@click="onToggleTip(false)")
    div.login-form.container.rounded-md.bg-black.bg-opacity-60.text-white.p-4.mt-48
      ul.tabs.flex.flex-row.py-1
          li.tab.mr-10.text-lg(@click="onChangeLoginType(1)" :class="{'border-b-2': loginType === 1}") 短信登录/注册
          li.tab.text-lg.text-opacity-80(@click="onChangeLoginType(2)" :class="{'border-b-2': loginType === 2}") 密码登录
      ol.form
          li.form-item.flex.flex-col.border-b.py-1
              p.text-xs.py-4 手机号
              div.flex.items-center
                  span.text-xs.mr-2 +86
                  input.bg-transparent.text-xs.flex-1(placeholder="请输入手机号" type="number" v-model="user.phone" @input="onCheckInputLength('phone', 11)")
          li.form-item.flex.flex-col.border-b.py-1(v-if="loginType === 1")
              p.text-xs.py-4 短信验证码
              div.flex.items-center
                  input.bg-transparent.text-xs.flex-1(placeholder="请输入短信验证码" type="number" v-model="user.code" @input="onCheckInputLength('code', 4)")
                  button.w-20.h-6.bg-red-500.text-xs.rounded(@click="onSendCode" :disabled="seconds < 60") {{sendTxt}}
          li.form-item.flex.flex-col.border-b.py-1(v-else)
              p.text-xs.py-4 密码
              div.flex.items-center
                  input.bg-transparent.text-xs.flex-1(placeholder="请输入密码" maxlength="16" type="password" v-model="user.password")
      div.text-right.mt-1
          span.text-xs(@click.stop="onToggleTip(true)" :class="{'hidden': loginType === 2}") 收不到验证码
      div.text-xs.float-right.bg-white.inline-block.text-gray-600.p-4.rounded.relative(v-if="showTip")
          p 收不到验证码可尝试以下方案:
          p 1.通信网络异常请重启手机
          p 2.查看手机设置-信息-黑名单
          p 3.检查是否有安全软件拦截了验证码   
    div.w-full.h-11.bg-red-600.text-center.mt-14.rounded.align-middle.text-white.leading-10(@click="onSubmit") 登 录
    div.text-xs.text-white.mt-4 未注册手机在验证后将自动登录
    div.text-xs.mt-36.text-white.flex.flex-row.items-center
      input.w-3.h-3.mr-1.bg-red-600(type="checkbox" v-model="checked")
      span 我已阅读并接受 
      router-link.text-red-600(to="/agreement/user") 《用户协议》
      router-link.text-red-600(to="/agreement/privacy") 《隐私协议》
</template>

<script setup lang="ts">
import { RESEND_CODE_TIME, MOBILE_REG, PASSWORD_REG } from '@/config/system.conf'
import { SET_INFO } from "@/store/types.store"

import { ref, reactive, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import Util from '@/utils'
import { _sendCode, _login } from '@/service/modules/user.api'


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
onBeforeUnmount(() => { // 清除计时器
  if (interval.value && interval.value !== -1) {
    clearInterval(interval.value)
  }
})

/*******************方法区 ******************/
// 收不到验证码的提示框
const onToggleTip = (flag: boolean) => {
  showTip.value = flag
}

// 长度检查
const onCheckInputLength = (type: string, len: number) => {
  if (user[type].toString().length >= len) {
    user[type] = user[type].toString().substring(0, len)
  }
}
// 登录方式
const onChangeLoginType = (type: number) => {
  loginType.value = type
}

// 发送验证码
const onSendCode = async () => {
  if (!MOBILE_REG.test(user.phone)) {
    Util.$notify('danger', '手机号码格式不正确')
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
    if (await _sendCode(user.phone)) { // 如果有数据
      Util.$notify('success', '发送成功')
    }
  }
}

// 登录
const onSubmit = async () => {
  if ($checkData()) {
    const data = await _login(loginType.value, user)
    if (data) {
      store.commit(SET_INFO, data)
      const hasPassword = store.getters.info.hasPassword
      if(hasPassword) { // 已经设置过密码
        Util.$notify('success', '登录成功')
        router.replace('/home/index')
      } else { // 没有设置密码
        Util.$dialog('confirm', '', '恭喜你注册成功,是否立即设置【登陆密码】?').then(() => {
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
    Util.$notify('danger', '请勾选服务协议')
    return false
  }
  if (!MOBILE_REG.test(user.phone)){ // 校验手机
    Util.$notify('danger', '手机号码格式不正确')
    return false
  }
  if (loginType.value === 1) { // 验证码登录
    if (!user.code || user.code.toString().length !== 4) { // 校验验证码格式
      Util.$notify('danger', '验证码格式不正确')
      return false
    }
  } else { // 密码登录
    if(!PASSWORD_REG.test(user.password)) { // 校验密码
      Util.$notify('danger', '密码必须是8-16位字母数字组合')
      return false
    }
  }
  return true
}

</script>
<style lang="sass" scoped>
#login
  background-image: url('@/assets/imgs/login_bg@2x.png')
  background-size: 100% 100%
  height: 812px!important
  .login-form
    height: 246px
</style>