

import React, { Component } from 'react'
//redux
import { connect } from 'react-redux'

//antd 
import { Layout } from "antd";
//自定义
import './admin.less'
import Header from './Header/Header'
import check from '@/containers/HOC/check'
import LeftNav from './LeftNav/LeftNav'

const { Footer, Sider, Content } = Layout;

@connect(
  (state)=>({isLogin:state.userInfo.isLogin}),
  {}
)
@check
class Admin extends Component {
  render() {
    //没有登录时
    return (
      <Layout className="layout-style">
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <Header />
          <Content>Content</Content>
          <Footer>Footer</Footer>
        </Layout>
    </Layout>
    )
  }
}

export default Admin
