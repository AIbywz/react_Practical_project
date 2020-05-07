//创建 保存title 的 action（动作）

import {SAVE_CATEGORY} from '../actions_type'
import { reqCategoryList } from '@/api'
import { message } from 'antd'

//创建 保存 title 的 action
export const saveCategory = (categoryArr)=> ({type:SAVE_CATEGORY,data:categoryArr})

//创建 保存 title 的 异步action
export const saveCategoryAsync = ()=> {
  return async (dispath)=>{
    //发送Ajax请求
    let result = await reqCategoryList()
    const {status,data,msg}  = result
    if (status ===0) {
      dispath(saveCategory(data))
    }else{
      message.error(msg)
    }
  }
}