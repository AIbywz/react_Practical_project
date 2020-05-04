//创建 login的 reducer 

import {SAVE_USERINFO} from '../actions_type'

let initState = {user:{},token:''} //定义初始化状态

export default function (preState=initState,action) {
  const {type,data} = action
  let newState //定义新状态
  switch (type) {
    case SAVE_USERINFO:
      newState = {...data}
      return newState
    default:
      return preState
  }

  
}