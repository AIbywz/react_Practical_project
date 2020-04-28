import React, { Component } from 'react'
import {Switch,Route, Redirect} from 'react-router-dom'
// 自定义路由
import Admin from "./pages/Admin";
import Login from './pages/Login'

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/login" component={Login}></Route>
        <Route path="/admin" component={Admin}></Route>
        <Redirect to="/login"/>
      </Switch>
    )
  }
}
