//汇总 reducer  

import { combineReducers } from "redux"
import loginReducer from './login'
import titleReducer from "./title"
import categoryReducer from './category'

//保存所有的状态
export default combineReducers({
  userInfo : loginReducer,
  title: titleReducer,
  categoryList : categoryReducer
})
