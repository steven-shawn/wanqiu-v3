<template lang="pug">
div.live-chat.h-screen.overflow-y-auto.pb-11.bg-white(ref="chat" @scroll="onscroll")
  div.px-2.flex.bg-grey-lighter.items-center
    img.w-3.h-3(src="./icon_notify@2x.png")
    //- marquee.h-8.leading-8.text-primary.text-xs 这里是公告内容这里是公告内容这里是公告内容这里是公告内容 
    van-notice-bar.w-full(delay="1" scrollable background="#edf0f2" :text="state.announcement" :key="state.announcement" v-if="state.announcement")
  //- live-chat-msg 
  //- live-chat-msg(text-color="#d46666") 
  live-chat-msg(type="msg" v-for="(item,index) in state.chatList" :key="index" :item="item" 
    v-if="Object.keys(nobles).length && Object.keys(levels).length") 
  live-chat-input(@send="onSendMsg")
  div.fixed.bottom-16(style="left: 7%" @click.stop="scrollToBottom(true)" v-if="!state.atBottom")
    span.text-xs.text-red-light 更多消息
    van-icon.text-red-light(name="arrow-down")
  div.w-16.h-16.fixed.left-2.bottom-16.z-10(@click.stop="onService" style="left: 13.5%")
    img(src="./helper.png")
</template>

<script lang="ts" setup>
import LiveChatMsg from '@/components/live-chat-msg/index.vue'
import LiveChatInput from '@/components/live-chat-input/index.vue'
import { onBeforeUnmount, onMounted, reactive } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { WS_URL, IMG_URL} from '@/config/system.conf'
import { computed, ref } from '@vue/reactivity'
import { nextTick, watch } from 'vue'
import { Notify } from 'vant'

const route = useRoute()
const store = useStore()
const chat = ref() // $ref

const props = defineProps(['giftInfo'])

watch(() => props.giftInfo, (newVal, oldVal) => {
  // console.log(newVal)
  onSendMsg(newVal)
})

let timeout: number | null = null
let scrollTimeout: number | null

const TIME_BREAK = 50 * 1000 // 发送间隔

const CLINET = 'H5'
const VERSION = '1.0.0'
const APP_ID = '1'
const DEVICE = '1'
const SOURCE_IP = '1'

const TOKEN = store.state.user.userInfo.access_token // 登陆token
// const ID = store.state.user.userInfo.memIdentityId // 用户id
const ROOM_ID = store.state.live.room_id // 直播间id

const userInfo = computed(() => {
  return store.state.user.userInfo
})

const nobles = computed(() => {
  return store.state.live.nobles
})

const levels = computed(() => {
  return store.state.user.levels
})

const onService = async () => {
  await store.dispatch('live/SET_SERVICE_LINK', ROOM_ID)
  const link = store.state.live.serviceLink
  if (link) {
    // location.href = link
  }
}

// console.log(userInfo)
const PUBLIC_DATA = { // 公共数据
  device: DEVICE,
  client: CLINET,
  appId: APP_ID,
  version: VERSION,
  sourceIp: SOURCE_IP,
  token: TOKEN || '1',
  sender: '1',
  receiver: ROOM_ID,
  userType: 'Tourist',
  userInfo: {} //{...store.state.user.userInfo, access_token: '', refresh_token: ''}
}


const state = reactive({
  announcement: '', // 公告
  atBottom: false, // 是否已经在底部了
  chatList: []
})

let socket = null

const send = (num: number | string, item: string | object) => { // 发送消息
  let msgObj = {}
  if (num == "1") {//ping
    msgObj  = { ...PUBLIC_DATA, content: 'PING' }
  }
  if (num == "2013") {//发言
    msgObj = {...PUBLIC_DATA, content: item }
    if (item && item.count) msgObj.contentType = "Gift"
  }
  if (num == "2014") {//验证成功 进入直播间
      msgObj = {...PUBLIC_DATA}
  }
  const sendStr = `${num}#` + JSON.stringify(msgObj)
  // console.log(num, msgObj)
  socket.send(sendStr);
  // this.inpTxt = ""
}

// 发送消息
const onSendMsg = (e: Event) => {
  // console.log(e)
  if (!e) {
    Notify({type: 'warning', message: '请输入内容' })
    return
  }
  send('2013', e)
}

/// 滚动到底部
const scrollToBottom = (flag: boolean) => {
  if (chat.value.scrollHeight - chat.value.clientHeight <= 0) { // 内容不够的时候
    state.atBottom = true
  }
  if (state.atBottom || flag) {
    nextTick(() => {
      // console.log(chat.value.scrollHeight, chat.value.clientHeight, chat.value.scrollHeight - chat.value.clientHeight)
      chat.value.scrollTo(chat.value.scrollHeight - chat.value.clientHeight, 300) //
      // chat.value.scrollTo(10000, 300)
    })
  }
  
}

// 判断是否在底部
const onscroll = (e: Event) => {
  if (scrollTimeout) { // 节流
    clearTimeout(scrollTimeout)
  }
  scrollTimeout = setTimeout(() => {
    const { scrollHeight, scrollTop, clientHeight } = e.target || {}
    // console.log(e, scrollTop, scrollHeight, clientHeight)
    state.atBottom = scrollTop === scrollHeight - clientHeight //
    // console.log('atBottom', state.atBottom)
  }, 50)
}

// 清除定时器
const clearTimer = () => {
  if (timeout) {
    clearTimeout(timeout)
    timeout = null
  }
}

// 保持会话
const keepAlive = () => {
  clearTimer()
  timeout = setTimeout(() => {
    send(1, '')
    keepAlive()
  }, TIME_BREAK)
}

onMounted(async () => {
  const { query: { id }} = route
  if(id) {
    store.commit('live/SET_ROOM_ID', id)
    store.dispatch('live/SET_GIFT_LIST')
  }
  await store.dispatch('live/SET_NOBLE')
  await store.dispatch('user/SET_LEVEL')
  // console.log('levels',levels.value[1]['effectUrl'])
  socket = new WebSocket(WS_URL)

  // 打开链接
  socket.onopen = (e) => {
    if (e.type === 'open') {
      const msg = { ...PUBLIC_DATA }
      socket.send(`1000#${JSON.stringify(msg)}`)
      keepAlive()
    }
  }

  socket.onmessage = function (evt) {
    let { data: res } = evt
    res = res.split('#') // xxxx#{code:xxx,data: {}, msg: ''}
    const MSG_TYPE = res[0] // xxxx
    // console.log(res)
    try { // 是对象
      res = JSON.parse(res[1]) // {code:xxx,data: {}, msg: ''}
    } catch { // 是字符串
      res = { code: 100, data: res[1], msg: 'system'}
    }
    const chatListItem = {} // 消息单体
    let { code , data, msg } = res
    // data = JSON.parse(data)
    // console.log('data', data)
    try {
      data = JSON.parse(data)
    } catch {
    }
    // console.log(code, data, msg)
      // let stringifyItem = evt.data.split('#')
      // let obj = {}
      let item = {}
      // let objItem = {}
      // if (stringifyItem[1].indexOf('code') !== -1) {
      //     obj = JSON.parse(stringifyItem[1]);
      //     msgType = stringifyItem[0]
      // }
      switch (MSG_TYPE) {
          case "10000":   //心跳检测
              console.log('心跳检测', data)
              break;
          case "1000":   // Login ok
              send('2014', '')
              break;
          case "9999":   // send message Ok
            let { userId } = data
            userId += ''
            // PUBLIC_DATA['sender'] = userId
            if (!PUBLIC_DATA['userInfo'].nickName) {
              userId = userId.substring(0, userId.length - 5) + data.nickName.split('-')[1]
              PUBLIC_DATA['userInfo'] = {...data, userId }
              PUBLIC_DATA['sender'] = userId
            }
            // console.log('1', data, nickName, PUBLIC_DATA)
              //if (TOKEN) {
                // data.nobleGradeNum = userInfo.nobleGradeNum
                // data.memGradeLevel = userInfo.memGradeLevel
                // if(userInfo.memIdentityId == ROOM_ID) {//主播
                //     data.identityType =  1
                // }
                // state.chatList.push(item);
              // } else {
              //     let s1 = data.nickName.split("-")[1]
              //     data.userId = String(data.userId)
              //     let s2 = data.userId.slice(data.userId.length - 5, data.userId.length)
              //     data.userId = data.userId.replace(s2, s1)
              // }
              // that.touristInfo = data
              // item = {
              //     type: '9999',
              //     member_id: data.member_id ? data.member_id : null, //会员
              //     noble_level: data.noble_level,  //贵族
              //     is_manage: data.is_manage,  //管理员
              //     is_anchor: '',  //主播
              //     super_manage: data.super_manage, //超管
              //     msg: "进入直播间",
              //     nickName: data.nickName,
              //     userInfo: data
              // };
              // state.chatList.push(item);
              // that.$nextTick(() => {
              //     that.$refs.element.scrollTop = 10000000;
              // });
              break;
          case "2013":  // 发送消息后的回消息  
          case "2014":   //接受历史消息
              /*msgType*/
              // ROOM_ENTER 进入直播间
              // ROOM_TEXT  ：发言内容
              if (code / 1 !== 100) {
                Notify({ type: 'danger', message: msg})
                return
              }
              const { msgType = '', contentType = '' } = data || {}
              if (msg === 'system') { // 公告
                state.announcement = data
                chatListItem.type = msg
                chatListItem.content = data
              } else {
                chatListItem.type = msgType
                chatListItem.content = data.content
                chatListItem.userInfo = JSON.parse(data.userInfo || "{}")
                if (msgType === 'ROOM_ENTER') {
                  chatListItem.content = '进入直播间'
                }
                if (contentType === 'Gift') { // 礼物
                  const gift = JSON.parse(data.content || "{}")
                  chatListItem.content = '送出' + gift.count + '个' // + giftObj.giftName
                  chatListItem.gift = Object.keys(store.state.live.giftObj).length ? `${IMG_URL}${store.state.live.giftObj[gift.giftName]['pictureUrl']}` : null
                  // chatListItem.content = `<span>送出${gift.count}个<img style="width: 20px; height: 20px;" src="" /></span>`
                }
              }
              state.chatList.push(chatListItem)
              nextTick(() => {
                scrollToBottom(false)
              })
              break;     
          case "1020":   //离开直播间
              break;
          case "1030":   //送礼物
              // if (Number(data.cost * data.number) >= 520) {
              //     that.svgaList.push(data.animation)
              //     if (!that.isShowGiftSvga) {//没有正在展示动画  立即展示
              //         that.sendGiftMv()
              //     }
              // }
              // item = {
              //     type: msgType,
              //     nickName: data.nickName,
              //     gift_name: data.gift_name,
              //     thumb: data.thumb,
              //     number: data.number,
              //     member_id: data.member_id,
              //     noble_level: data.noble_level,
              //     is_manage: data.is_manage,
              //     is_anchor: userInfo.memIdentityId == data.memIdentityId,  //主播
              //     super_manage: data.super_manage,
              //     userInfo: data.content,
              // };
              // state.chatList.push(item);
              // that.$nextTick(() => {
              //     that.$refs.element.scrollTop = 10000000;
              // });
              break;
          case "1040":   //普通发言
              item = {
                  type: msgType,
                  nickName: data.nickName,
                  msg: data.content.msg,
                  member_id: data.member_id,
                  noble_level: data.noble_level,
                  is_manage: data.is_manage,
                  is_anchor: userInfo.memIdentityId == data.memIdentityId,  //主播
                  super_manage: data.super_manage,
                  userInfo: data.content.userInfo,
                  trumpet: data.content.trumpet
              };
              state.chatList.push(item);
              // that.$nextTick(() => {
              //     that.$refs.element.scrollTop = 10000000;
              // });
              // that.updateManage(obj)
              // that.$emit("sendDankamu", item)
              break;
          case "1041":   //贵族喇叭
              // item = {
              //     title: ` 喇叭消息： 【${data.content.userInfo.nickName}】 ${data.content.msg}`,
              //     msg: ` 喇叭消息： 【${data.content.userInfo.nickName}】 ${data.content.msg}`,
              //     trumpet: data.content.trumpet
              // };
              // that.$emit("sendDankamu", item)
              break;
          case "1050":   //主播进入直播间
              break;
          case "1060":   //踢出直播间
              // item = {
              //     type: '1060',
              //     msg: "被踢出直播间",
              //     nickName: data.nickName,
              // };
              // if (userInfo.member_id === data.member_id) {
              //     that.$message({
              //         type: "warning",
              //         message: "您已被踢出直播间"
              //     })
              //     that.$router.push({name: "home"})
              // }
              // state.chatList.push(item);
              // that.$nextTick(() => {
              //     that.$refs.element.scrollTop = 10000000;
              // });
              break;
          case "1070":   //禁言xxx
              // item = {
              //     type: '1070',
              //     msg: data.content.msg,
              // };
              // state.chatList.push(item);
              // that.$nextTick(() => {
              //     that.$refs.element.scrollTop = 10000000;
              // });
              break;
          case "1071":   //禁言xxx
              // item = {
              //     type: '1071',
              //     msg: '系统消息：' + data.nickName + ' 已被禁言',
              //     // nickName: data.nickName,
              // };
              // state.chatList.push(item);
              // that.$nextTick(() => {
              //     that.$refs.element.scrollTop = 10000000;
              // });
              break;
          case "1080":   //开通/续费 贵族
              // item = {
              //     type: '1080',
              //     msg: '系统提示：' + data.content.msg,
              //     noble_icon: data.noble_icon,
              // }
              // state.chatList.push(item);
              // that.$nextTick(() => {
              //     that.$refs.element.scrollTop = 10000000;
              // });
              // that.$emit("sendDankamu", item)
              // break;
          case "1090":   //1090主播关闭直播
              // item = {
              //     type: '1090',
              //     msg: "系统提示：主播已下播",
              // };
              // state.chatList.push(item);
              // that.$nextTick(() => {
              //     that.$refs.element.scrollTop = 10000000;
              // });
              // that.$emit("changeLiveStatus", 1)
              // break;
          case "1100":   //1100主播离开
              break;
          case "1120":   //系统提示
              // item = {
              //     type: '1120',
              //     msg: '系统提示：' + data.content.msg,
              // };
              // state.chatList.push(item);
              // that.$nextTick(() => {
              //     that.$refs.element.scrollTop = 10000000;
              // });
              break;
          case "1130":   //公告
              // that.announcement = data.msg || data.content.msg
              break;
          case "1180":   //设为房管
              // item = {
              //     type: '1180',
              //     msg: "被设为房管",
              //     nickName: data.nickName,
              // };
              // state.chatList.push(item);
              // that.$nextTick(() => {
              //     that.$refs.element.scrollTop = 10000000;
              // });
              break;
          case "1181":   //移除房管
              // that.updateManage(obj)
              break;
          case "2010":   //信息發送頻繁
              item = {
                  type: '2010',
                  msg: data.content,
              };
              state.chatList.push(item);
              // that.$nextTick(() => {
              //     that.$refs.element.scrollTop = 10000000;
              // });
              break;
          case "3010":   //贵族没有喇叭数量
              item = {
                  type: '3010',
                  msg: data.content,
              };
              state.chatList.push(item);
              // that.$nextTick(() => {
              //     that.$refs.element.scrollTop = 10000000;
              // });
              break;
          case "4032":   //PC直播间指数
              console.log(data.content)
              item = {
                  type: '4032',
              };
              // that.$emit("changeOdds", data.content)
              break;
          case "6000":   //其他地方登陆
              // that.$message({
              //     type: "warning",
              //     duration: "1500",
              //     message: "登录已失效，请重新登录",
              // })
              // let timer = setTimeout(() => {
              //     that.$store.commit("logout", {type: 1})
              //     clearTimeout(timer)
              // }, 1500)
              break;
          default:     //1110主播回来
              break;
      }

  };

  // socket.on('open')
  // console.log(route.query.id, store.state.live.room_id)
})

onBeforeUnmount(() => {
    console.log('bofore')
    clearTimer()
    socket && socket.close()
  })

</script>

<style scoped lang="sass">
.live-chat
    margin-top: -364px
    padding-top: 364px
</style>
