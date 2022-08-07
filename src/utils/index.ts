/**
 * 统一出口
 */
// import DateUtil from './Date.uitl'
import ImageUtil from './Image.util'
import MessageUtil from './Message.util'
import RemUtil from './Rem.util'
// import StorageUtil from './Storage.util'

export default {
    ...ImageUtil,
    ...MessageUtil,
    ...RemUtil
}
