//封装Ajax  管理axios请求响应拦截，
import axios from 'axios'
import qs from 'querystring'
import { message as msg } from "antd";

// 配置默认路径
axios.defaults.baseURL = 'http://localhost:3000'
//配置默认请求超时时间
axios.defaults.timeout = 1000

 // axios请求拦截器
 axios.interceptors.request.use((config)=>{
  //1.json 转换成urlencoded
  const { method,data} = config
  if (method.toLowerCase() === 'post' && data instanceof Object) {
    config.data = qs.stringify(data)
  }
  return config
})
// axios响应拦截器
axios.interceptors.response.use(
  // 成功的回调
  response => {
    return response.data
  },
  //失败的回调
  error => {
    let errmsg = '未知错误'
    const {message} = error
    if (message.indexOf('timeout') !== -1) {
      errmsg = '网络不稳定，连接超时'
    }else if (message.indexOf('Network') !== -1) {
      errmsg = '无网络，请检查网络连接'
    }else if (message.indexOf('401') !== -1) {
      errmsg = '未登录或身份过期，请重新登录'
    }
    msg.error(errmsg)
    return new Promise(()=>{})
  }
)

export default axios