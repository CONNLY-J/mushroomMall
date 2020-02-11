//首页的所有需要的数据请求
import {request} from './request'

//首页请求的多个数据
export function getHomeMultidata(){
    return request({
        url:'/home/multidata'
    })
}

// 根据type和page请求商品数据
// 在home.js中封装getHomeGoods(type, page)
// 在Home.vue中, methods中getHomeGoods(type)
export function getHomeGoods(type,page){
    return request({
        url:'/home/data',
        params:{
            type,
            page
        }
    })
}