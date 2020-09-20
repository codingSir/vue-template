
// 正常加载
// import Home from '../views/home'
// import About from '../views/About'
import { UserLayout } from '../layouts'
// 按需（懒）加载（vue实现）
const TabLayout = () => import( /* webpackChunkName: "home" */ '@/layouts/TabLayout');
const Home = () => import( /* webpackChunkName: "home" */ '../views/home');
const About = () => import( /* webpackChunkName: "about" */ '../views/about');
const Product = () => import('../views/product');
const Login = () => import('@/views/user/login');

//基础路由
export const constantRouterMaps = [
    {
        path: '*',
        redirect: '/user/login'
    },
    {
            path: '/user',
            component:UserLayout,
            redirect: '/user/login',
            children:[
                {
                    path: 'login',
                    name: 'login',
                    component: Login
                },
            ]
    },
];

//动态路由 或者需要权限控制的路由
export const asyncRouterMaps = [
    {
        path: '/tab',
        name: 'tab',
        redirect:'/tab/home',
        component:TabLayout,
        components: 'layouts/TabLayout',
        meta: { title: 'tab', permission: [ 'tab' ] },
        children:[
            {
                path: '/tab/home',
                name: 'home',
                component:Home,
                components: 'views/home',
                meta: { title: '首页', permission: [ 'tab' ] }
            },
            {
                path: '/tab/product',
                name: 'product',
                component:Product,
                components: 'views/product',
                meta: { title: '产品', permission: [ 'tab' ] }
            },
            {
                path: '/tab/about',
                name: 'about',
                component:About,
                components: 'views/about',
                meta: { title: '检查清单', permission: [ 'tab' ] }
            }
        ]
    },
];