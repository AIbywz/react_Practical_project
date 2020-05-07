

import React, { Component } from 'react'
//redux
import { connect } from 'react-redux'
import { Route, Redirect , Switch} from 'react-router-dom'
//antd 
import { Layout } from "antd";
//自定义
import './admin.less'
import Header from './Header/Header'
import check from '@/containers/HOC/check'
import LeftNav from './LeftNav/LeftNav'


import Home from './Home/Home'
import User from './User/User'
import Role from './Role/Role'
import Category from './Category/Category'
import Product from './Product/Product'
import Bar from './Bar/Bar'
import Line from './Line/Line'
import Pie from './Pie/Pie'

const { Footer, Sider, Content } = Layout

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
          <Content>
            <Switch>
              <Route path="/admin/home" component={Home}/>
              <Route path="/admin/user" component={User}/>
              <Route path="/admin/role" component={Role}/>
              <Route path="/admin/prod_about/category" component={Category}/>
              <Route path="/admin/prod_about/product" component={Product}/>
              <Route path="/admin/charts/bar" component={Bar}/>
              <Route path="/admin/charts/line" component={Line}/>
              <Route path="/admin/charts/pie" component={Pie}/>
              <Redirect to="/admin/home" />
            </Switch>
          </Content>
          <Footer>Footer</Footer>
        </Layout>
    </Layout>
    )
  }
}

export default Admin
