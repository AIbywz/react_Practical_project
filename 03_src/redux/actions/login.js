//创建 保存用户信息的 action（动作）

import {SAVE_USERINFO,DELETE_USERINFO} from '../actions_type'

//创建 保存 用户信息的 action
export const saveUserInfo = (userObj)=>{
  //向本地储存用户信息
  const {user,token} = userObj
  localStorage.setItem('user',JSON.stringify(user))
  localStorage.setItem('token',token)
  //返回 保存用户信息状态
  return {type:SAVE_USERINFO,data:userObj}
}

//创建 删除 用户信息 的 action
export const deleteUserInfo = (userObj)=>{
  //删除 用户信息
  localStorage.clear()
  return {type:DELETE_USERINFO}
} 