import Vue from 'vue'
import VueRouter from 'vue-router'

const Home= () => import ('../views/home/Home.vue')
const Detail = () => import('../views/detail/Detail')
const Category = () => import('../views/category/Category')
const ShopCart = () => import('../views/shopcart/ShopCart')
const Profile = () => import('../views/profile/Profile')

//安装插件
Vue.use(VueRouter)

//创建路由对象
const routes=[
    {
        path:'',
        redirect:'/home'
    },
    {
        path:'/home',
        component:Home
    },
    //获取iid，动态路由的写法
    {
        path:'/detail/:iid',
        component: Detail
    },
    {
        path:'/category',
        component: Category
    },
    {
        path:'/shopcart',
        component: ShopCart
    },
    {
        path:'/profile',
        component: Profile
    }
]
const router = new VueRouter({
    routes,
    mode:'history'
})
export default router