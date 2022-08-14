import request from '@/service/request'
import { loginUser } from '@/types/login.type'
import { DEFAULT_PAGE_SIZE } from '@/config/system.conf'
import { useRoute } from 'vue-router'

/***============== 个人中心及登录/注册 ====================== */


/**
 * 格式化用户信息字段
 * @param result 返回的原字段
 * @returns
 */
// const formatUserInfo = (result: any) => {
//     return {
//         id: result.id, // 用户id（数据库id）
//         account: result.account, // 登录id
//         token: result.token, // 登录凭证
//         nickname: result.nickname, // 昵称
//         signature: result.sign, // 个性签名
//         mid: result.member_id, // 会员id
//         level: result.level, // 会员等级
//         levelIcon: result.icon, // 等级icon
//         levelName: result.level_name, // 等级名称
//         isNoble: result.is_noble === 2, // 是否是贵族 1不是 2是
//         nobleLevel: result.noble_level, // 贵族等级
//         isAnchor: result.is_anchor === 2, // 是不是主播 是否开通主播 1未开通 2已开通
//         isSpecialist: result.is_specialist === 2, // 是不是专家 1不是 2是
//         isSuperManage: result.super_manage === 2, // 是不是超级管理员
//         hasPassword: result.is_make_pwd === 1, // 是否需要设置密码1否 2是
//         experience: result.experience, // 经验
//         gender: result.gender, // 性别 1男 2女 3保密
//         avatar: result.avatar, // 头像地址
//         balance: result.balance, // 余额
//         birth: result.birth, // 生日
//         code: result.code, // 邀请码
//         trumpet: result.trumpet, // 喇叭数量
//         hasRoom: result.is_room === 2, // 是否有直播间1未拥有 2已拥有
//         regType: result.create_type, // 1普通注册 2后台新增
//         device: result.device, // 登录设备
//         anchorInfo: result.anchor_info // TODO:这是个对象
//     }
// }


/**
 * 发送短信验证码
 * @param mobile 电话号码
 * @returns
 */
export const _sendCode = (mobile: string | number) => {
    return request({
        url: '/pc/smsCode/sendLogonCode',
        method: 'GET',
        loading: true,
        headers: {
            'Authorization': 'Basic cGM6cGM='
        },
        params: {
            mobile, // 手机号码
            // type: 1 // 登录方式：1手机登录,2密码登录
        }
    })
}

/**
 * 登录接口
 * @param type 类型
 * @param user 登录对象
 * @returns
 */
export const _login = (type: number, user:loginUser) => {
    return new Promise((resolve, reject) => {
        request({
            url: '/auth/mobile/token/sms?mobile=' + 'SMS@' + user.phone + '&grant_type=mobile&code='+ user.code,
            method: 'POST',
            loading:true,
            returnType: 'origin', // 原样返回
            headers: {
                'Authorization': 'Basic YXBwOmFwcA=='
            },
            data: {
                // mobile: 'SMS@' + user.phone, // 手机号
                // // password: type === 2 && user.password, // 密码
                // code: type === 1 && user.code, // 验证码
                // grant_type: 'mobile' // 登录方式
            }
        }).then(data => {
            resolve(data)
            // resolve(formatUserInfo(data))
        })
    })
}

/**
 * 获取用户详情
 * @returns
 */

export const _userinfo = (token: string) => {
    return request({
        url: '/pc/memmemberrelated/memMember',
        method: 'GET',
        laoding: true,
        headers: {
            'Authorization': token
        }
    })
}

/**
 * 退出
 * @returns
 */
export const _logout = () => {
    return request({
        url: '/live/login/logout',
        method: 'POST'
    })
}

/**
 * 获取轮播图
 * @param type 位置
 * @param pageNum 页码
 * @param pageSize 每页大小
 * @returns
 */
export const _banners = (type: string = 'h1', pageNum:number = 1, pageSize: number = DEFAULT_PAGE_SIZE) => {
    return request({
        url: 'pc/opeadvertising/page',
        method: 'GET',
        data: {
            pageNum, // 页码
            pageSize, // 每页多少条
            position_no: type, // 广告位编号  h1
        }
    })
}