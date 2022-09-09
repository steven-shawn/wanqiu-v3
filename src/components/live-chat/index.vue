<template lang="pug">
div.live-chat.h-screen.overflow-y-auto.pb-11.bg-white
  div.px-2.flex.bg-grey-lighter.items-center
    img.w-3.h-3(src="./icon_notify@2x.png")
    marquee.h-8.leading-8.text-primary.text-xs 这里是公告内容这里是公告内容这里是公告内容这里是公告内容
  live-chat-msg
  live-chat-msg(color="#d46666")
  live-chat-msg(type="msg" v-for="item in 10" :key="item")
  live-chat-input
</template>

<script lang="ts" setup>
import LiveChatMsg from '@/components/live-chat-msg/index.vue'
import LiveChatInput from '@/components/live-chat-input/index.vue'
import { onBeforeUnmount, onMounted, reactive } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { WS_URL } from '@/config/system.conf'
import { computed } from '@vue/reactivity'
const route = useRoute()
const store = useStore()

let timeout: number | null = null

const TIME_BREAK = 50 * 1000 // 发送间隔

const CLINET = 'mobile'
const VERSION = '1.0.0'
const APP_ID = '1'
const DEVICE = '1'
const SOURCE_IP = '1'

const TOKEN = store.state.user.userInfo.access_token // 登陆token
const ID = store.state.user.userInfo.memIdentityId // 用户id
const ROOM_ID = store.state.live.room_id // 直播间id

const userInfo = computed(() => {
  return store.state.user.userInfo
})

// console.log(userInfo)
const PUBLIC_DATA = { // 公共数据
  device: DEVICE,
  client: CLINET,
  appId: APP_ID,
  version: VERSION,
  sourceIp: SOURCE_IP,
  token: TOKEN,
  sender: ID,
  receiver: ROOM_ID,
  userInfo: JSON.stringify(store.state.user.userInfo)
}


const state = reactive({
  chatList: []
})

let socket = null

const send = (num: number | string, item: string | object) => { // 发送消息
  let msgObj = {}
  if (num == "1") {//ping
    msgObj  = { ...PUBLIC_DATA, cotent: 'PING' }
  }
  if (num == "2013") {//发言
    msgObj = {...PUBLIC_DATA, content: item }
    if (item && item.count) msgObj.contentType = "Gift"
  }
  if (num == "2014") {//验证成功 进入直播间
      msgObj = {...PUBLIC_DATA}
  }
  const sendStr = `${num}#` + JSON.stringify(msgObj)
  socket.send(sendStr);
  // this.inpTxt = ""            
}

onMounted(() => {
  const { query: { id }} = route
  if(id) {
    store.commit('live/SET_ROOM_ID', id)
  }

  socket = new WebSocket(WS_URL)

  // 打开链接
  socket.onopen = (e) => {
    if (e.type === 'open') {
      const msg = { ...PUBLIC_DATA }
      socket.send(`1000#${JSON.stringify(msg)}`)
      keepAlive()
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
  // 清除定时器
  const clearTimer = () => {
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }
  }


  socket.onmessage = function (evt) {
    let { data: res } = evt
    res = res.split('#')
    const msgType = res[0]
    res = JSON.parse(res[1])
    const { code , data, msg } = res
    console.log(code, data, msg)
      // let stringifyItem = evt.data.split('#')
      // let obj = {}
      let item = {}
      let objItem = {}
      // if (stringifyItem[1].indexOf('code') !== -1) {
      //     obj = JSON.parse(stringifyItem[1]);
      //     msgType = stringifyItem[0]
      // }
      switch (msgType) {
          case "10000":   //心跳检测
              console.log('心跳检测', data)
              break;
          case "1000":   //Login ok
              send('2014', '')
              break;
          case "9999":   //
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
          case "2014":   //接受历史消息
              /*msgType*/
              // ROOM_ENTER 进入直播间
              // ROOM_TEXT  ：发言内容
              // if (data.userInfo && data.userInfo !== '') {
              //     objItem = Object.assign(data, {type: msgType}, {userInfo: JSON.parse(data.userInfo)})
              //     if (objItem && objItem.userInfo && objItem.userInfo.memGradeLevel) {
              //         objItem.userInfo.icon = that.leveList.filter(item => item.level == objItem.userInfo.memGradeLevel)[0].effectUrl
              //     }
              //     if (objItem && objItem.userInfo && objItem.userInfo.nobleGradeNum) {
              //         objItem.userInfo.noble_icon = that.nobleList.filter(item => item.gradeNum == objItem.userInfo.nobleGradeNum)[0].logoUrl
              //     }
              //     if (objItem.msgType === 'ROOM_ENTER') objItem.content = '进入直播间'
              //     if (objItem.contentType === 'Gift') {
              //         let giftJson = JSON.parse(objItem.content)
              //         let giftInfo = that.giftList.filter(item => item.giftName == giftJson.giftName)[0]
              //         giftInfo.count = giftJson.count
              //         objItem.content = giftInfo
              //     }
              //     state.chatList.push(objItem);
              //     that.$nextTick(() => {
              //         that.$refs.element.scrollTop = 10000000;
              //     });
              //     that.$emit("sendDankamu", objItem)
              //     // debugger
              // } else {
              //     console.log('2014-异常', data.userInfo)
              // }
              break;
          case "2013":   //
              // if (data.userInfo && data.userInfo !== '') {
              //     objItem = Object.assign(data, {type: msgType}, {userInfo: JSON.parse(data.userInfo)})
              //     if (objItem && objItem.userInfo && objItem.userInfo.memGradeLevel) {
              //         objItem.userInfo.icon = that.leveList.filter(item => item.level == objItem.userInfo.memGradeLevel)[0].effectUrl
              //     }
              //     if (objItem && objItem.userInfo && objItem.userInfo.nobleGradeNum) {
              //         objItem.userInfo.noble_icon = that.nobleList.filter(item => item.gradeNum == objItem.userInfo.nobleGradeNum)[0].logoUrl
              //     }
              //     if (objItem.msgType === 'ROOM_ENTER') objItem.content = '进入直播间'
              //     if (objItem.contentType === 'Gift') {
              //         let giftJson = JSON.parse(objItem.content)
              //         let giftInfo = that.giftList.filter(item => item.giftName == giftJson.giftName)[0]
              //         giftInfo.count = giftJson.count
              //         objItem.content = giftInfo
              //     }
              //     state.chatList.push(objItem);
              //     that.$nextTick(() => {
              //         that.$refs.element.scrollTop = 10000000;
              //     });
              //     that.$emit("sendDankamu", objItem)
              // } else {
              //     console.log('2013-异常')
              // }
              // break;
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
  onBeforeUnmount(() => {
    clearTimer()
    socket && socket.close()
  })

  console.log(route.query.id, store.state.live.room_id)
})

</script>

<style scoped lang="sass">
.live-chat
    margin-top: -296px
    padding-top: 296px
</style>
