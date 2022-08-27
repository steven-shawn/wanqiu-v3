/**
 * 统一出口
 */
// import DateUtil from './Date.uitl'
// import { require } from './Image.util'
// import MessageUtil from './Message.util'
// import RemUtil from './Rem.util'
// import StorageUtil from './Storage.util'

const require = (url: string) => {
    return  `src/${url}`
}

export default {
    require
}

// export default {
//     // ...ImageUtil,
//     // ...MessageUtil,
//     // ...RemUtil,
//     require
// }
