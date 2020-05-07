//汇总 reducer  

import { combineReducers } from "redux"
import loginReducer from './login'
import titleReducer from "./title";

//保存所有的状态
export default combineReducers({
  userInfo : loginReducer,
  title: titleReducer
})
