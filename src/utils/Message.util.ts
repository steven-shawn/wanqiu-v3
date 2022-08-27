import { Notify, Dialog } from 'vant'
/**
 * 通知提示
 * @param type 类型 
 * @param message 消息
 */
const $notify = (type: 'success' | 'warning' | 'danger' | 'primary', message: string) => {
    Notify({ type, message })
}


const $dialog = (type: string, title: string, message: string) => {
    if (type === 'confirm') { // 确认弹框
        return Dialog.confirm({
            title,
            message
        })
    }
}


export default {
    $notify,
    $dialog
}

