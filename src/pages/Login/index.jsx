import React, { Component } from 'react'

import './login.less'
import logo from './imgs/logo.png'

export default class index extends Component {
  render() {
    return (
      <div id="login">
        <header>
          <img src={logo} alt="logo"/>
          <h1>商品后台管理系统</h1>
        </header>
        <section>
          <h1>用户登录</h1>
          <span>表单</span>
        </section>
      </div>
    )
  }
}
