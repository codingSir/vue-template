import Vue from 'vue'
import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import notification from 'ant-design-vue/es/notification'
import { generateIndexRouter } from "@/common/util"

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/user/login'] // no redirect whitelist

router.beforeEach((to, from, next) => {
    NProgress.start() // start progress bar

    // if (Vue.ls.get(ACCESS_TOKEN)) {
        /* has token */
            if (store.getters.permissionList.length === 0) {
                store.dispatch('GetPermissionList').then(res => {
                    const menuData = res;
                    console.log(menuData);
                    if (menuData === null || menuData === "" || menuData === undefined) {
                        return;
                    }
                    let constRoutes = [];
                    constRoutes = generateIndexRouter(menuData);
                    // 添加主界面路由
                    store.dispatch('UpdateAppRouter',  { constRoutes }).then(() => {
                        // 根据roles权限生成可访问的路由表
                        // 动态添加可访问路由表
                        console.log(store.getters.addRouters)
                        router.addRoutes(store.getters.addRouters)
                        const redirect = decodeURIComponent(from.query.redirect || to.path)
                        if (to.path === redirect) {
                            // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
                            next({ ...to, replace: true })
                        } else {
                            // 跳转到目的路由
                            next({ path: redirect })
                        }
                    })
                })
                    .catch(() => {
                        /* notification.error({
                           message: '系统提示',
                           description: '请求用户信息失败，请重试！'
                         })*/
                        next({ path: '/user/login', query: { redirect: to.fullPath } })
                    })
            }  else {
                if (whiteList.indexOf(to.path) !== -1) {
                    // 在免登录白名单，直接进入
                    next()
                } else {
                    // next({ path: '/user/login', query: { redirect: to.fullPath } })
                    next();
                    NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
                }
            }
})

router.afterEach(() => {
    NProgress.done() // finish progress bar
})
