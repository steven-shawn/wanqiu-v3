<template>
    <div>1</div>
</template>

<script>
    import Hashids from 'hashids'
    import SVGA from "svgaplayerweb"
    import {Picker} from "emoji-mart-vue";
    import store from "@/vux/store";
    import {getToken} from "@/utils/cookie";
    import {findMemGradeDTOList, findMemNobleGradeDTOcList} from "@/api/user";
    import {statusCode} from "@/utils/statusCode";
    import {findOpeSpeakQuickly} from "@/api/common";
    // import {banSaying} from "@/api/roomOpt";
    import Axios from "axios";
    import {Message} from "@/utils/message";

    export default {
        components: {Picker},
        props: {
            giftList: {
                type: [Object, Array],
                default: null
            },
            nobleInfo: {
                type: Object,
                default: null
            },
            visitSend: {
                type: Boolean,
                default: false
            },
            room_info: {
                type: Object,
                default: function () {
                    return {}
                }
            }
        },
        data() {
            return {
                pingTimer: null,
                pingTime: 30,
                pingFlag: false,
                touristInfo: null,  //游客信息
                quickList: false,
                optPerson: null,  //被操作人信息
                optShow: false, //房管等权限操作
                connectTime: null,
                countdown: 5, //倒计时 5秒重连
                timer: null,
                isLeave: false,
                isConnect: false,
                isShowIcon: false,
                isShowGiftSvga: false,
                isAnchor: false,
                isManager: false,   //是否是管理者
                inpTxt: "",
                // pushContent: '',
                icon_trumpet: require("@static/img/room/icon_3.png"),
                noble_1: require("@static/img/test/noble_1.png"),
                noble_2: require("@static/img/test/noble_2.png"),
                icon_8: require("@static/img/room/icon_8.png"),
                icon_13: require("@static/img/room/icon_13.png"),
                icon_14: require("@static/img/room/icon_14.png"),
                icon_15: require("@static/img/noble/icon.png"),
                icon_manage: require("@static/img/room/icon_mange.png"),
                icon_anchor: require("@static/img/room/icon_anchor.png"),
                icon_super: require("@static/img/room/icon_super.png"),
                webSocket: null,
                value: '600',
                // userInfo: null,
                leveList: [],
                nobleList: [],
                svgaList: [],
                chatList: [],
                quickChatList: []
            }
        },
        computed: {
            userInfo() {
                return this.$store.state.userInfo
            },
        },
        watch: {
            isConnect(newVal) {
                if (!newVal && !this.isLeave) { // 非主动断线
                    this.reConnect()
                }
                if (newVal) { //连接成功 清楚重连定时器
                    clearInterval(this.connectTime)
                }
            },
            userInfo(newVal, oldVal) {
                if (newVal.memIdentityId && !oldVal) window.location.reload()
            },
            giftList(newVal) {
                if (newVal.length) {
                    this.getLevel()  //会员等级
                }
            }
        },
        created() {
            this.monitoring() // 注册监听事件
            this.getQuickList()
        },
        methods: {
            monitoring() {
                this.$on('sendGiftChat', val => {
                    this.send('2013', val)
                })
            },
            async getNoble() {
                let {code, data} = await findMemNobleGradeDTOcList()
                data.map(item => {
                    item.logoUrl = STATIC.fileUpload + item.logoUrl
                    item.bigLogoUrl = STATIC.fileUpload + item.bigLogoUrl
                    item.effectUrl = STATIC.fileUpload + item.effectUrl
                    item.mountEffectUrl = STATIC.fileUpload + item.mountEffectUrl
                })
                if (code === statusCode.success) this.nobleList = data
                this.connectWebSocket()
            },
            async getLevel() {
                let {code, data} = await findMemGradeDTOList()
                if (code === statusCode.success) {
                    data.map(item => {
                        item.effect = STATIC.fileUpload + item.effect
                        item.effectUrl = STATIC.fileUpload + item.effectUrl
                    })
                    this.leveList = data
                    await this.getNoble()  //贵族等级
                }
            },
            sendQuick(item) {
                this.quickList = false
                this.send("2013", item)
            },
            pingDesc() {
                this.pingTimer = setInterval(() => {
                    if (this.pingTime <= 0) {
                        clearInterval(this.pingTimer)
                        this.pingTime = 30
                        this.send('1')
                        this.pingDesc()
                    } else {
                        this.pingTime -= 1
                    }
                }, 1000)
            },
            async getQuickList() {//直播间聊天列表
                let {code, data} = await findOpeSpeakQuickly()
                if (code === statusCode.success) {
                    this.quickChatList = data
                }
            },
            sendMessage() {
                if (!this.inpTxt.trim().length) return
                if (!getToken()) {
                    this.send("2013")
                } else {
                    this.send("2013")
                }
            },
            send(num, item) {
                let userId, sendStr, sendCon
                if (getToken()) {
                    userId = this.userInfo.memIdentityId
                } else {
                    userId = this.touristInfo.userId
                }
                if (num == "1") {//ping
                    sendCon = {
                        "device": "1",
                        "content": "PING",
                        "client": "pc",
                        "appId": "1",
                        "version": "1.0.0",
                        "token": getToken() ? getToken() : '1',
                        "sourceIp": "1",
                    }
                }
                if (num == "2013") {//发言
                    sendCon = {
                        "sender": userId,
                        "content": item || this.inpTxt,
                        "device": "1",
                        "receiver": this.$route.query.memIdentityId,
                        "client": "pc",
                        "appId": "1",
                        "version": "1.0.0",
                        "sourceIp": "1",
                        "token": getToken() ? getToken() : '1',
                        "userInfo": JSON.stringify(this.touristInfo)
                    }
                    if (item && item.count) sendCon.contentType = "Gift"
                }
                if (num == "2014") {//验证成功 进入直播间
                    sendCon = {
                        "device": "0",
                        "sender": userId,
                        "client": "pc",
                        "receiver": this.$route.query.memIdentityId,
                        "appId": "1",
                        "version": "1.0.0",
                        "sourceIp": "0",
                        "token": getToken() ? getToken() : '1',
                        "userInfo": this.touristInfo
                    }
                }
                if (!getToken()) sendCon.userType = "Tourist"
                sendStr = `${num}#` + JSON.stringify(sendCon)
                this.webSocket.send(sendStr);
                this.inpTxt = ""
            },
            connectWebSocket() {
                let that = this;
                this.webSocket = new WebSocket(`${STATIC.wsRoom}`);
                this.webSocket.onopen = function (e) {
                    let sendCon = {}
                    if (e.type == "open") {
                        if (that.userInfo) {
                            sendCon = {
                                "device": "1",
                                "sender": that.userInfo.memIdentityId,
                                "client": "pc",
                                "appId": "1",
                                "version": "1",
                                "token": getToken(),
                                "sourceIp": "1",
                            }
                        } else {
                            sendCon = {
                                "device": "1",
                                "sender": "1",
                                "client": "pc",
                                "appId": "1",
                                "version": "1",
                                "token": "1",
                                "sourceIp": "1",
                                "userType": "Tourist"
                            }
                        }
                        console.log('---websocke已连接成功---')
                        that.isConnect = true
                        that.pingDesc()  //ping倒计时
                        let sendStr = '1000#' + JSON.stringify(sendCon)
                        that.webSocket.send(sendStr);
                    }
                };
                this.webSocket.onmessage = function (evt) {
                    let stringifyItem = evt.data.split('#')
                    let obj = {}, item = {}, objItem = {}
                    if (stringifyItem[1].indexOf('code') !== -1) {
                        obj = JSON.parse(stringifyItem[1]);
                        obj.type = stringifyItem[0]
                    } else {
                        if (stringifyItem[1] == 'PONG') return
                        obj = {
                            type: '1120',
                            content: stringifyItem[1]
                        }
                    }
                    if (obj) {
                        switch (obj.type) {
                            case "10000":   //心跳检测
                                console.log(obj)
                                break;
                            case "1000":   //Login ok
                                that.send('2014')
                                break;
                            case "9999":   //
                                if (getToken()) {

                                } else {
                                    let s1 = obj.data.nickName.split("-")[1]
                                    obj.data.userId = String(obj.data.userId)
                                    let s2 = obj.data.userId.slice(obj.data.userId.length - 5, obj.data.userId.length)
                                    obj.data.userId = obj.data.userId.replace(s2, s1)
                                }
                                if (getToken()) {
                                    // 1主播 2房管 3超管 0其他  identityType
                                    obj.data.nobleGradeNum = that.userInfo.nobleGradeNum
                                    obj.data.memGradeLevel = that.userInfo.memGradeLevel
                                    if (that.userInfo.memIdentityId == that.$route.query.memIdentityId) {//主播
                                        obj.data.identityType = 1
                                        that.isManager = true
                                    }
                                    if (that.userInfo.superFlag == 1) {//超管
                                        obj.data.identityType = 3
                                        that.isManager = true
                                    }
                                }
                                that.touristInfo = obj.data
                                break;
                            case "2014":   //接受历史消息
                                /*msgType*/
                                // ROOM_ENTER 进入直播间
                                // ROOM_TEXT  ：发言内容
                                if (obj.data.userInfo && obj.data.userInfo !== '') {
                                    objItem = Object.assign(obj.data, {type: obj.type}, {userInfo: JSON.parse(obj.data.userInfo)})
                                    if (objItem && objItem.userInfo && objItem.userInfo.memGradeLevel) {
                                        objItem.userInfo.icon = that.leveList.filter(item => item.level == objItem.userInfo.memGradeLevel)[0].effectUrl
                                    }
                                    if (objItem && objItem.userInfo && objItem.userInfo.nobleGradeNum) {
                                        objItem.userInfo.noble_icon = that.nobleList.filter(item => item.gradeNum == objItem.userInfo.nobleGradeNum)[0].logoUrl
                                    }
                                    if (objItem.msgType === 'ROOM_ENTER') objItem.content = '进入直播间'
                                    if (objItem.contentType === 'Gift') {
                                        let giftJson = JSON.parse(objItem.content)
                                        let giftInfo = that.giftList.filter(item => item.giftName == giftJson.giftName)[0]
                                        giftInfo.count = giftJson.count
                                        objItem.content = giftInfo
                                    }
                                    that.chatList.push(objItem);
                                    that.$nextTick(() => {
                                        that.$refs.element.scrollTop = 10000000;
                                    });
                                    that.$emit("sendDankamu", objItem)
                                    // debugger
                                } else {
                                    console.log('2014-异常', obj.data.userInfo)
                                }
                                break;
                            case "2013":   //
                                if (obj.data.userInfo && obj.data.userInfo !== '') {
                                    objItem = Object.assign(obj.data, {type: obj.type}, {userInfo: JSON.parse(obj.data.userInfo)})
                                    if (objItem && objItem.userInfo && objItem.userInfo.memGradeLevel) {
                                        objItem.userInfo.icon = that.leveList.filter(item => item.level == objItem.userInfo.memGradeLevel)[0].effectUrl
                                    }
                                    if (objItem && objItem.userInfo && objItem.userInfo.nobleGradeNum) {
                                        objItem.userInfo.noble_icon = that.nobleList.filter(item => item.gradeNum == objItem.userInfo.nobleGradeNum)[0].logoUrl
                                    }
                                    if (objItem.msgType === 'ROOM_ENTER') objItem.content = '进入直播间'
                                    if (objItem.contentType === 'Gift') {
                                        let giftJson = JSON.parse(objItem.content)
                                        let giftInfo = that.giftList.filter(item => item.giftName == giftJson.giftName)[0]
                                        giftInfo.count = giftJson.count
                                        objItem.content = giftInfo
                                        debugger
                                        if (Number(giftInfo.count * giftInfo.diamondPrice) >= 520) {
                                            debugger
                                            that.svgaList.push(giftInfo.specialEffectsUrl)
                                            if (!that.isShowGiftSvga) {//没有正在展示动画  立即展示
                                                that.sendGiftMv()
                                            }
                                        }
                                    }
                                    that.chatList.push(objItem);
                                    that.$nextTick(() => {
                                        that.$refs.element.scrollTop = 10000000;
                                    });
                                    that.$emit("sendDankamu", objItem)
                                } else {
                                    console.log('2013-异常')
                                }
                                break;
                            case "1020":   //离开直播间
                                break;
                            case "1030":   //送礼物

                                break;
                            case "1041":   //贵族喇叭
                                item = {
                                    title: ` 喇叭消息： 【${obj.content.userInfo.nickName}】 ${obj.content.msg}`,
                                    msg: ` 喇叭消息： 【${obj.content.userInfo.nickName}】 ${obj.content.msg}`,
                                    trumpet: obj.content.trumpet
                                };
                                that.$emit("sendDankamu", item)
                                break;
                            case "1050":   //主播进入直播间
                                break;
                            case "1060":   //踢出直播间
                                item = {
                                    type: '1060',
                                    msg: "被踢出直播间",
                                    nickName: obj.nickName,
                                };
                                if (that.userInfo.member_id === obj.member_id) {
                                    that.$message({
                                        type: "warning",
                                        message: "您已被踢出直播间"
                                    })
                                    that.$router.push({name: "home"})
                                }
                                that.chatList.push(item);
                                that.$nextTick(() => {
                                    that.$refs.element.scrollTop = 10000000;
                                });
                                break;
                            case "1090":   //1090主播关闭直播
                                item = {
                                    type: '1090',
                                    msg: "系统提示：主播已下播",
                                };
                                that.chatList.push(item);
                                that.$nextTick(() => {
                                    that.$refs.element.scrollTop = 10000000;
                                });
                                that.$emit("changeLiveStatus", 1)
                                break;
                            case "1120":   //系统提示
                                item = {
                                    type: '1120',
                                    content: '系统提示：' + obj.content,
                                };
                                that.chatList.push(item);
                                that.$nextTick(() => {
                                    that.$refs.element.scrollTop = 10000000;
                                });
                                break;
                            case "1130":   //公告
                                // that.announcement = obj.msg || obj.content.msg
                                break;
                            case "1181":   //移除房管
                                that.updateManage(obj)
                                break;
                            case "3010":   //贵族没有喇叭数量
                                item = {
                                    type: '3010',
                                    msg: obj.content,
                                };
                                that.chatList.push(item);
                                that.$nextTick(() => {
                                    that.$refs.element.scrollTop = 10000000;
                                });
                                break;
                            case "4032":   //PC直播间指数
                                item = {
                                    type: '4032',
                                };
                                that.$emit("changeOdds", obj.content)
                                break;
                            default:     //1110主播回来
                                break;
                        }
                    }
                };
                // 关闭链接
                this.webSocket.onclose = function () {
                    console.log("webScoket  已经断开");
                    clearInterval(that.pingTimer)
                    if (!that.isLeave) that.isConnect = false
                };
            },
            closeWs() {
                this.webSocket.close();
            },
            reConnect() { // 断线重连
                this.connectTime = setInterval(() => {
                    this.connectWebSocket()
                    console.log('断线重连')
                }, 5000)
            },
            muteMember(item, type) {//直播间禁言操作
                const hashids = new Hashids('0qDw6JujBPzPbAsr', 8)
                let u_id = hashids.encode(this.userInfo.memIdentityId)
                let app_id = hashids.encode(1)
                let json = {
                    roomId: this.$route.query.memIdentityId,
                    userId: item && item.userId
                }
                let msg = `确认将会员【${item.nickName}】禁言？`
                if (type === 5) msg = `确认将会员【${item.nickName}】解除禁言？`
                if (type === 4) msg = `确认将会员【${item.nickName}】踢出直播间？`
                this.$confirm(msg, {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    if (type === 1) { //禁言
                        let url = '/room/ban-saying.api'
                        const options = {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json;charset=utf-8',
                                'x-user-id': u_id,
                                'x-request-id': 1,
                                'x-version': 1,
                                'x-client': 'H5',
                                'x-app-id': app_id,
                                'Authorization': 'Authorization ' + getToken(),
                            },
                            data: json,
                            url,
                        };
                        Axios(options).then(res => {
                            if (res.data.code == 100) {
                                Message("禁言成功")
                            }
                        })
                    }
                    if (type === 2) { //解除禁言
                        let url = '/room/remove-ban-saying.api'
                        const options = {
                            method: 'get',
                            headers: {
                                'content-type': 'application/json;charset=utf-8',
                                'x-user-id': u_id,
                                'x-request-id': 1,
                                'x-version': 1,
                                'x-client': 'H5',
                                'x-app-id': app_id,
                                'Authorization': 'Authorization ' + getToken(),
                            },
                            params: json,
                            url,
                        };
                        Axios(options).then(res => {
                            if (res.data.code == 100) {
                                Message("成功解除禁言")
                            }
                        })
                    }
                    this.optShow = false
                }).catch(() => {
                    console.log('取消操作')
                })
            },
            roomManageSet(item, status) { //设为房管操作
                let data = {
                    room_id: this.room_info.room_id,
                    member_id: item.member_id,
                    status
                }
                let msg
                if (status === 1) msg = `确认将会员【${item.nickName}】设置为房管？`
                if (status === 2) msg = `确认取消会员【${item.nickName}】房管权限？`
                this.$confirm(msg, {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // AutoAxios(ROUTES.POST.liveRoom.roomManage, true, data).then(res => {
                    //     if (res.data.code == 200) {
                    //         this.$message({
                    //             type: 'success',
                    //             message: res.data.msg
                    //         })
                    //         this.optShow = false
                    //     }
                    // })
                }).catch(() => {
                    console.log('取消操作')
                })
            },
            updateManage(obj) { //更新用户管理权限
                if (this.userInfo) {
                    if (this.userInfo.member_id == obj.member_id) { // 本人发言
                        if (obj.is_manage != 0 || obj.super_manage != 0) {
                            this.isManager = true
                        } else {
                            if (this.userInfo.member_id == this.room_info.member_id) {  //是否是当前房间主播
                                this.isManager = true
                                this.isAnchor = true
                            } else {
                                this.isManager = false
                            }
                        }
                    }
                }
            },
            optClick(item) {
                if (item.userType === 'Tourist') return  //暂时不可禁言游客
                if ([1, 2, 3].includes(item && item.userInfo && item.userInfo.identityType)) {
                    return
                } else if (this.isManager) {
                    this.optShow = !this.optShow
                    this.optPerson = item.userInfo
                }
                // this.optPerson = item && item.userInfo
                // if (item.userInfo.member_id == this.userInfo.member_id) return;  //當前用戶是自己
                // if (item.super_manage == '1') return;  //當前用戶是超管
                // // 判断自己身份

                // this.optShow = !this.optShow
            },
            sendGiftMv() { //展示送礼动画
                console.log(this.svgaList.length)
                this.isShowGiftSvga = true
                let player = new SVGA.Player("#giftCanvas");
                let parser = new SVGA.Parser("#giftCanvas");
                let that = this
                // let time = new Date()
                // let time_str = JSON.stringify(time).replace(/(\-)|(\.)|(\:)/g, "")
                // let time_str = Date.parse(new Date())
                // let tem = `${that.svgaList[0]}?t=${time_str}`
                // return
                parser.load(that.svgaList[0], function (videoItem) {
                    player.loops = 1;
                    player.clearsAfterStop = true; //清除当前动画
                    player.setVideoItem(videoItem);
                    player.startAnimation();
                    player.onFinished(() => { //完成执行回调
                        that.svgaList.shift()
                        if (that.svgaList.length > 0) {
                            that.sendGiftMv()
                        } else {
                            that.isShowGiftSvga = false
                        }
                    })
                });
            },
            addEmoji(e) {//表情包插件
                this.isShowIcon = false;
                if (!this.userInfo && !this.visitSend) {
                    return
                }
                this.inpTxt += e.native;
                this.$nextTick(() => {
                    this.$refs.inputBox.focus();
                });
            },
            changeEmo() {
                if (!getToken()) {//未登录 && 发言未打开
                    store.commit("changeLoginPopup", true)
                    return;
                } else {
                    this.isShowIcon = !this.isShowIcon
                }
            },
            // sendTrumpet() {
            //     if (!this.userInfo) {
            //         this.noLogin()
            //     } else {
            //         if (this.userInfo.is_noble != 2) {
            //             this.$message({
            //                 type: "warning",
            //                 message: "升级贵族才能使用",
            //                 duration: 1500
            //             })
            //         } else {  //贵族 喇叭发言
            //             this.send('1040', '', 2)
            //         }
            //     }
            // },
            showNoble() {
                if (!this.userInfo) {
                    this.noLogin()
                } else {
                    this.$emit("changeNoble")
                }
            },
            noLogin() {
                store.commit("changeLoginPopup", true)
                // this.$message({
                //     type: "warning",
                //     message: "登录后才能发言",
                //     duration: 1500
                // })
            }
        },
        beforeDestroy() {
            this.send('1001')
            clearInterval(this.connectTime)
            clearInterval(this.pingTimer)
            this.isLeave = true  //主动离开 不需重连
            this.closeWs()
            this.isShowGiftSvga = false
            this.svgaList = []
        }
    }
</script>

<style scoped lang="scss">
    @import "./index";
</style>