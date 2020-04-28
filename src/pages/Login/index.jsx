import React, { Component } from 'react'
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios'
import qs from 'querystring'

import './login.less'
import logo from './imgs/logo.png'

  // axios请求拦截器
  axios.interceptors.request.use((config)=>{
    //转换成urlencoded
    const { method,data} = config
    if (method.toLowerCase() === 'post' && data instanceof Object) {
      config.data = qs.stringify(data)
    }
    return config
  })
  // axios响应拦截器

export default class index extends Component {

  //表单提交并且验证成功的回调
  onFinish = values => {
    axios.post('http://localhost:3000/login',values).then(
      response => {console.log(response);},
      error => {console.log(error);}
    )
  };

  //用户名验证规则
  userValidator = (_,value='')=>{
    const userReg =  /^\w+$/
    let errArr = []
    //判断用户输入的数据
    /*
    用户名/密码的的合法性要求
      1). 必须输入
      2). 必须大于等于4位
      3). 必须小于等于12位
      4). 必须是英文、数字或下划线组成
    */
    if (value === '') return Promise.reject('用户名不能为空!')
    if(value.length < 4) errArr.push('用户名必须大于等于四位!')
    if (value.length > 12) errArr.push('用户名必须小于等于十二位!')
    if (!userReg.test(value)) errArr.push('用户名必须是英文、数字或下划线组成！')
    if (errArr.length !== 0) return Promise.reject(errArr)
    else return Promise.resolve()
  }

  //密码验证规则
  pwdValidator = (_,value)=>{
    const pwdReg = /^\w+$/
    let errorArr = []
    if (!value.trim()) {
      return Promise.reject('密码不能为空！')
    }if (value.length < 4) {
      errorArr.push('密码必须大于等于四位！')
    }if (value.length >12) {
      errorArr.push('密码必须小于等于十二位！')
    }if (!pwdReg.test(value)) {
      errorArr.push('密码必须是英文、数字或下划线组成！')
    }if (errorArr.length !==0) {
      return Promise.reject(errorArr)
    }
    else{
      return Promise.resolve()
    }
  }

  render() {
    return (
      <div id="login">
        <header>
          <img src={logo} alt="logo"/>
          <h1>商品后台管理系统</h1>
        </header>
        <section>
          <h1>用户登录</h1>
          
          <Form
            name="normal_login"
            className="login-form"
            onFinish={this.onFinish}
          >
            <Form.Item
              name="username"
              rules={[{validator:this.userValidator}]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{validator:this.pwdValidator}]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="请输入密码"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
}
