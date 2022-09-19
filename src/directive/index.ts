export default {
    install(Vue) {
        // 如果是h5需要跳转到下载页面
        // Vue.directive('download', {
        //     bind: function(el, binding, vnode) {
        //         const { isH5 } = getOS()
        //         // console.log(binding.modifiers.auth, isH5, vnode)
        //         // return
        //         if (isH5) { // h5跳转
        //             let instance = vnode.componentInstance
        //             if (instance) { // 只有组件形式的才能用这个
        //                 instance.$off('click')
        //                 instance.$on('click', function() {
        //                     if (binding.modifiers.auth && !store.state.user.token) { // 先登录
        //                         instance.$router.push(`/login`)
        //                     } else {
        //                         instance.$router.push(`/download/${binding.value}`)
        //                     }
        //                 })
        //             } else {
        //                 canceEvent(el)
        //                 el.addEventListener('click', function(e) {
        //                     // e.preventDefault() // 非必须
        //                     e.stopPropagation() // 防止调用相同事件的传播, 必须
        //                     if (binding.modifiers.auth && !store.state.user.token) {
        //                         vnode.context.$router.push(`/login`)
        //                     } else {
        //                         vnode.context.$router.push(`/download/${binding.value}`)
        //                     }
        //                 }, true) // 在捕获阶段触发
        //             }
        //         }
        //     },
        //     unbind: function(el) {
        //         canceEvent(el)
        //     }
        // })

    }
}

