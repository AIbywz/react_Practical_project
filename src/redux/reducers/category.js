//创建 category 的 reducer 

import {SAVE_CATEGORY} from '@/redux/actions_type'
 
//定义初始状态
let initState = []
export default function (preState=initState,action) {
  const {type,data} = action
  let newState //定义新状态
  switch (type) {
    case SAVE_CATEGORY:
      newState = [...data]
      return newState
    default:
      return preState
  }

  
}