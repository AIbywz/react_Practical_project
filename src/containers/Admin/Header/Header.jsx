import React, { Component } from 'react'
import './css/Header.less'

import { Button,Modal } from 'antd';
import { FullscreenOutlined,FullscreenExitOutlined ,ExclamationCircleOutlined } from '@ant-design/icons';

import screenfull from 'screenfull'
import { connect } from 'react-redux';
import dayjs from 'dayjs'

import {deleteUserInfo} from '@/redux/actions/login'

const { confirm } = Modal;

 class Header extends Component {
  state = {
    isFull : false,
    time:dayjs().format('YYYY年 MM月DD日 HH:mm:ss')
  }
  //切换全屏/不全屏
  toggleFullscreen = ()=>{
    //切换全屏
    screenfull.toggle() 
  }

  //退出登录
  outLogin = ()=>{
    //调用deleteUserInfo 方法
    confirm({
      title: '你确定退出登录嘛？',
      icon: <ExclamationCircleOutlined />,
      cancelText :'取消',
      okText:'确定',
      onOk:() => {
        this.props.deleteUserInfo()
      },
    });
  }

  componentDidMount(){

    //检测屏幕的变化
    screenfull.onchange(()=>{
      const {isFull} = this.state
      this.setState({isFull:!isFull})
    })

    //开启定时器 检测 时间
    this.tirm =  setInterval(()=>{
      this.setState({time:dayjs().format('YYYY年 MM月DD日 HH:mm:ss')})
    },1000)
  }

  componentWillUnmount(){
    clearInterval(this.tirm)
  }

  render() {
    const {username} = this.props
    const {isFull,time} = this.state
    return (
      <div className="header">
        <div className="header-top">
        <Button size="small" onClick={this.toggleFullscreen}>
          {isFull ? <FullscreenExitOutlined/> : <FullscreenOutlined/>}
        </Button>
        <span className="username">欢迎，{username}</span>
          <Button type="link" size="small" onClick={this.outLogin}>退出登录</Button>
        </div>
        <div className="header-bottom">
          <div className="bottom-left">
            <span>首页</span>
          </div>
          <div className="bottom-right">
            <span>{time}</span>
            <img src="http://api.map.baidu.com/images/weather/day/qing.png" alt="天气logo"/>
            <span>多云转晴</span>
            <span>温度：1~10℃</span>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  (state) => ({username:state.userInfo.user.username}),
  {deleteUserInfo}
  )(Header)