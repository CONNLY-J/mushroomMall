import axios from 'axios'

export function request(config){
    //1.创建axios实例
    const instance = axios.create({
        baseURL:'http://123.207.32.32:8000/api/hy',
        timeout:5000
    })

    //2.axios的拦截器：用于在发送每次请求或者得到响应后，进行对应的处理
    //请求拦截可以做到的事情：1）当发送网络请求时，在页面中添加一个loading组件，作为动画
    //2）某些请求要求用户必须登录，判断用户是否有token，如果没有token跳转到login页面
    //3）对请求的数据进行序列化

    //配置请求拦截：
    instance.interceptors.request.use(config =>{
        return config
    },err =>{
        //console.log(err)
    })

    //配置响应拦截：
    instance.interceptors.response.use(res =>{
        return res.data
    },err =>{
       console.log(err)
    })

    //发送真正的网络请求
    return instance(config)
}