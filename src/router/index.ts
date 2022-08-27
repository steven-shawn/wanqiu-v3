import { createRouter, createWebHashHistory } from 'vue-router'

const modulesFiles = import.meta.globEager("../views/**/*.vue")
const routes: any = []
Object.keys(modulesFiles).map(key => {
    const name = key.replace('../views/', '/').replace('.vue', '')
    routes.push({
        path: name,
        name: name.replaceAll('/', ':'), // home:index
        component: modulesFiles[key].default
    })
})

const router = createRouter({
    history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
    scrollBehavior: () => ({
        x: 0,
        y: 0
    }), //页面初始化的时候都在0显示
    routes: [
        {path: '/', redirect: '/home/index'},
        ...routes,
        { path: '/:pathMatch(.*)', redirect: '/404' } // /:pathMatch(.*)*
    ]
})

// router.afterEach((to:Object, from: Object, next: Function) => {
//     // window.scrollTo(0, 0)
// })
// router.beforeEach((to:Object, from: Object, next: Function) => {
//     if (to.matched.some(res => res.meta.requireAuth)) {// 判断是否需要登录权限
//         if (localStorage.getItem('token')) {// 判断是否登录
//             next()
//         } else {// 没登录则跳转到登录界面
//             next({
//                 path: '/login',
//                 query: { redirect: to.fullPath }
//             })
//         }
//     } else {
//         next()
//     }
// })

// const originalPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//     return originalPush.call(this, location).catch(err => err)
// }

export default router;