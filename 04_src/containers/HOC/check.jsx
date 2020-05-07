//本组件为高阶组件，用于检查 登录/未登录
//如果登录成功，不允许 跳转 登录界面 / 如果没有登录，不允许跳转 admin

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

export default function (OriginalComponents) {

  @connect(
    (state)=>({isLogin:state.userInfo.isLogin}), //映射状态
    {}
  )
  class TargetComponent extends Component {
    render() {
      //判断是否登录
      const { isLogin } = this.props  // 获取登录标识
      const { pathname } = this.props.location  // 获取访问的地址
      if(!isLogin && pathname !== '/login') return <Redirect to="/login"/>
      if(isLogin && pathname === '/login') return <Redirect to="/admin" />
      return < OriginalComponents {...this.props} />
    }
  }
  return TargetComponent
}