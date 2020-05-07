//创建 title 的 reducer 

import {SAVE_TITLE} from '@/redux/actions_type'
 
//定义初始状态
let initState = ''
export default function (preState=initState,action) {
  const {type,data} = action
  let newState //定义新状态
  switch (type) {
    case SAVE_TITLE:
      newState = data
      return newState
    default:
      return preState
  }

  
}