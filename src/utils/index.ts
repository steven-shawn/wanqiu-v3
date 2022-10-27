/**
 * 统一出口
 */
// import DateUtil from './Date.uitl'
// import { require } from './Image.util'
// import MessageUtil from './Message.util'
// import RemUtil from './Rem.util'
// import StorageUtil from './Storage.util'

import { Dialog } from "vant";
import { _getDownloadUrl } from "@/service/modules/user.api";
import { APP_NAME } from "@/config/system.conf";

const require = (url: string) => {
    return  `src/${url}`
    // return new URL(`src/${url}`, import.meta.url).href
}

export const getOS = () => { // window.navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    const ua = navigator.userAgent;
    const isWindowsPhone = /(?:Windows Phone)/.test(ua),
        isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
        isAndroid = /(?:Android)/.test(ua),
        isFireFox = /(?:Firefox)/.test(ua),
        // isChrome = /(?:Chrome|CriOS)/.test(ua),
        isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
        isPhone = /(?:iPhone)/.test(ua) && !isTablet,
        isApk = ua.toLowerCase().indexOf('html5plus') > 0,
        isPc = !isPhone && !isAndroid && !isSymbian && !isApk;
    return {
        isTablet: isTablet, // 是不是平板设备
        isPhone: isPhone, // iphone
        isAndroid : isAndroid, // android
        isApk: isApk, // HBuilderX 打包后的apk包
        isPc : isPc, // pc
        isH5: !isPhone && !isApk // 安卓网页
    }
}


export const download = () => {
    Dialog.confirm({
        title: '',
        message: `下载${APP_NAME}体育APP\n更多精彩内容体验`,
        beforeClose: (action) => {
            if (action === 'confirm') { // 确定
                _getDownloadUrl().then(url => {
                    Dialog.close()
                    window.location.href = url
                })
            } else { // 取消
                Dialog.close()
            }
        },
    })
}


// export default {
//     require
// }

// export default {
//     // ...ImageUtil,
//     // ...MessageUtil,
//     // ...RemUtil,
//     require
// }
