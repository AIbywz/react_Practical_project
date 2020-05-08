//封装Ajax  管理axios请求响应拦截，
import axios from 'axios'
import qs from 'querystring'
import { message as msg } from "antd";

import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/redux/store'
import { deleteUserInfo } from "@/redux/actions/login";
import { saveTitle } from '@/redux/actions/title';

// 配置默认路径
axios.defaults.baseURL = '/api'
//配置默认请求超时时间
axios.defaults.timeout = 2000

 // axios请求拦截器
 axios.interceptors.request.use((config)=>{
  Nprogress.start()
  //1.json 转换成urlencoded
  const { method,data} = config
  if (method.toLowerCase() === 'post' && data instanceof Object) {
    config.data = qs.stringify(data)
  }

  //如果存在token，那就携带token
    //在redux 中获取token
    const {token} = store.getState().userInfo
    if (token) {
      config.headers.Authorization =  'atguigu_'+token
    }
  //必须返回配置对象
  return config  
})
// axios响应拦截器
axios.interceptors.response.use(
  
  // 成功的回调
  response => {
    Nprogress.done()    
    return response.data
  },
  //失败的回调
  error => {
    Nprogress.done()
    
    let errmsg = '未知错误'
    const {message} = error
    if (message.indexOf('timeout') !== -1) {
      errmsg = '网络不稳定，连接超时'
    }else if (message.indexOf('Network') !== -1) {
      errmsg = '无网络，请检查网络连接'
    }else if (message.indexOf('401') !== -1) {

      //强制退出登录
      store.dispatch(deleteUserInfo())
      store.dispatch(saveTitle)
      errmsg = '未登录或身份过期，请重新登录'
    }
    msg.error(errmsg)
    return new Promise(()=>{})
  }
)

export default axios