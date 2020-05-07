//2.创建 store-核心的状态储存容器 （同时包含 reducer）

import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from "redux-devtools-extension";
import allReducer from "./reducers"

//暴露store 
export default createStore(allReducer,composeWithDevTools(applyMiddleware(thunk)))



