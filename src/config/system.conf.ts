export const REQUEST_URL = import.meta.env.VITE_APP_BASE_URL   // 请求地址 TODO: 区分环境

export const IMG_URL = 'http://xqadminimage.tyltxt.com:88/' // 图片服务器地址
export const REQUEST_TIMEOUT = 20000    // 网络请求超时时间,默认10秒

export const RESEND_CODE_TIME = 60 // 重新发送验证码的时间


export const USER_INFO = '__USER_INFO__' // 用户信息

export const MOBILE_REG = /^[1][3,4,5,7,8,9][0-9]{9}$/  // 手机号码正则表达式
export const PASSWORD_REG = /^[a-z](?=.*?\d)[a-z\d]{7,15}$/i // 密码验证规则


export const DEFAULT_PAGE_SIZE = 10 // 默认分页条数