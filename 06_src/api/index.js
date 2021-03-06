//统一管理 发送 Ajax 请求
import ajax from './ajax'
import {WEATHER_AK,CITY} from '@/config' 
import jsonp from 'jsonp'
import { message } from "antd";

//发送登录请求  携带{username: admin,password: admin}
export const reqLogin = (loginObj) => ajax.post('/login',loginObj)
//发送天气请求  用（jsonp）
export const reqWeatherDate = ()=>{
  //定义请求天气的 url路径
  const URL = `http://api.map.baidu.com/telematics/v3/weather?location=${CITY}&output=json&ak=${WEATHER_AK}`
  return new Promise((resolve)=>{
    //发送 jsonp 请求
    jsonp(URL,{
      timeout:2000,
    },(err,data)=>{
      if (!err) {
        resolve(data.results[0].weather_data[0])
      }else{
        message.error('请求天气信息有误，请联系管理员')
      }
    })
  })
}
//获取商品分类列表
export const reqCategoryList = () => ajax.get('/manage/category/list')

//请求添加商品分类
export const reqAddCategory = (categoryName)=>ajax.post('/manage/category/add',{categoryName})

//请求修改分类
export const reqUpdateCategory = (categoryId,categoryName) => ajax.post('/manage/category/update',{categoryId,categoryName})

