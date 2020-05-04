//创建 保存用户信息的 action（动作）

import {SAVE_USERINFO} from '../actions_type'

//创建 保存 用户信息的 action
export const saveUserInfo = (userObj)=>({type:SAVE_USERINFO,data:userObj})
