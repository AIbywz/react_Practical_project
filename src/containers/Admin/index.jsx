

import React, { Component } from 'react'
//redux
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

//antd 
import { Layout } from "antd";
//自定义
import './admin.less'
import Header from './Header/Header'

const { Footer, Sider, Content } = Layout;



class Admin extends Component {
  render() {
    if (!this.props.isLogin) {
      return <Redirect to="/login" />
    }
    return (
      <Layout className="layout-style">
        <Sider>Sider</Sider>
        <Layout>
          <Header />
          <Content>Content</Content>
          <Footer>Footer</Footer>
        </Layout>
    </Layout>
    )
  }
}

export default connect(
  (state)=>({isLogin:state.userInfo.isLogin}),
  {}
)(Admin)
