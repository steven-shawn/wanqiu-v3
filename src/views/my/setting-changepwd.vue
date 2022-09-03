<template lang="pug">
div.pb-20.pt-11.bg-gray-100.h-full 
  jq-header.fixed {{!state.type ? '设置' : '修改' }}登录密码 {{state.type}}
  div.px-4.py-4
    ul.flex.flex-col
        li.bg-white.mb-2.shadow-lg.rounded-lg.flex.flex-col.px-4.py-1(v-for="item in state.list" :key="item.id")
            p.text-xs.text.primary.pt-1(v-if="item.label") {{item.label}}
            input.text-xs.py-2(:placeholder="item.placeholder" :type="item.type" :maxlength="item.maxlength" 
              v-model="state.form[item.model]")
            p.flex.justify-between.items-center.pb-1(v-if="item.label") 
              span.text-xs.text-grey-light 验证码将发送到你的手机：{{phone}}
              button.w-20.h-6.bg-primary.text-white.text-xs.rounded(:class="state.seconds < 60 ? 'bg-grey' : 'bg-primary'"
                @click="onSendCode" :disabled="state.seconds < 60") {{state.sendTxt}}
    button.h-10.bg-primary.w-full.rounded.mt-2.text-white.text-xs(@click="onSubmit") 确认设置        
</template>

<script setup lang="ts">
import JqHeader from '@/components/jq-header/index.vue'
import { Notify } from 'vant';
import { PASSWORD_REG } from "@/config/system.conf"
import { onBeforeUnmount, onMounted, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { _sendCodeSetPwd, _setPwd } from '@/service/modules/user.api';
import { RESEND_CODE_TIME } from '@/config/system.conf';
import { useStore } from 'vuex';
import { computed } from '@vue/reactivity';
const router = useRouter()
const route = useRoute()
const store = useStore()

const initBtnText = '发送验证码'

const phone = computed(() => {
  let _phone = store.state.user.userInfo.registerPhone
  _phone = _phone.split('')
  return _phone.slice(0,3).join('') + '****' + _phone.slice(7,11).join('')
})

let timeout: null | number = null
const state = reactive({
  form: {
    phone: '',
    pwd: '',
    _pwd: '',
    sms: ''
  },
  list: [
    { id: 1, icon: '', placeholder: '请输入新的登录密码', router: '/my/setting-changepwd', type: 'password', model: 'pwd', maxlength: 16, label: '' },
    { id: 2, icon: '', placeholder: '请再次输入新登录密码', router: '', model: '_pwd', type: 'password', maxlength: 16, label: '' },
    { id: 3, icon: '', placeholder: '请输入验证码', router: '/my/setting-about', type: 'number', maxlength: 6, model: 'sms', label: '验证码' },
  ],
  type: '', // set or update
  interval: null,
  seconds: RESEND_CODE_TIME,
  sendTxt: initBtnText
})

onMounted(() => {
  const { query: { type} } = route
  state.type = type
})

// 发送验证码
const onSendCode = async () => {
    if(!PASSWORD_REG.test(state.form.pwd)) { // 校验密码
      Notify({type: 'warning', message: '密码必须是8-16位字母数字组合'})
      return false
    }
    if (state.form.pwd !== state.form._pwd) {
      Notify({type: 'warning', message: '两次密码不一致'})
      return false
    }
    state.interval = setInterval(() => {
      state.sendTxt = `重新发送${state.seconds}s`
      state.seconds--
      if (state.seconds < 0) {
        clearInterval(state.interval)
        state.seconds = RESEND_CODE_TIME
        state.sendTxt = initBtnText
      }
    }, 1000)
    await _sendCodeSetPwd(store.state.user.userInfo.memname)
    Notify({type: 'success', message: '发送成功'})
}

// 设置
const onSubmit = async () => {
  state.form.phone = store.state.user.userInfo.memname
  if (state.form.pwd && state.form._pwd && state.form.sms) {
    await _setPwd(state.form)
    Notify({type: 'success', message: '密码设置成功'})
    timeout = setTimeout(() => {
      router.push('/my/index')
    }, 500)
  } else {
    Notify({type: 'warning', message: '请填写完整表单'})
  }
}

onBeforeUnmount(() => { // 清理定时器
  if (state.interval) {
    clearInterval(state.interval)
  }
  if (timeout) {
    clearTimeout(timeout)
  }
})

</script>
