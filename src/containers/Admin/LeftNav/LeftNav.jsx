
import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import { connect } from "react-redux";
import {saveTitle} from '@/redux/actions/title'
//自定义
import logo from '@/state/images/logo.png'
import "./css/leftNav.less"
import menu from '@/config/config_menu'

import { Menu } from 'antd'

const { SubMenu } = Menu;

@connect(
  ()=>({}), //映射 动作状态
  {saveTitle} //映射操作动态的方法
)
@withRouter
 class LeftNav extends Component {

  //创建保存title 的函数
  saveTitle =(title)=>{
    this.props.saveTitle(title)
  }

  // 根据 路径 计算 title
  calculateTitle =()=>{
    let title = ''
    //1.找到当前路径中菜单的 key 
    const {pathname} = this.props.location //当前的路径
    let targetKey = pathname.split('/').slice(-1)[0] //当前菜单中的 key
    //如果成功登录，判断当前菜单中的key(admin)与默认展示的key(home)不相同则直接把admin改成home
    if (targetKey === 'admin') targetKey = 'home'
    //2.在菜单中找到对应的  title
      //1) 遍历 menu 判断是否有 key 相同，如果相同则 返回 title
      menu.forEach((menuObj)=>{ 
        //2) 判断是否有子菜单 如果有则继续判断
        if (!menuObj.children) {
          if (menuObj.key === targetKey) {
            return title = menuObj.title
          }
        }else{
          menuObj.children.map((childrenObj)=>{
            if (childrenObj.key === this.targetKet) {
              return title = childrenObj.title
            }
            return title
          })
        }
      })
      this.props.saveTitle(title)
  }

  componentDidMount(){
    this.calculateTitle()
  }
  //创建菜单导航的函数
  getMenuNav = (menuArr)=> {
    return menuArr.map((menuObj)=>{
      const {key,title,path} = menuObj
      if (!menuObj.children) {
        return (
          <Menu.Item key={key} onClick={()=>{this.saveTitle(title)}}>
            <Link to={path}>
              < menuObj.icon />
              {title}
            </Link>
            
          </Menu.Item>
        )
      }else{
        return (
          <SubMenu key={key} icon={<menuObj.icon />} title={title}>
            {this.getMenuNav(menuObj.children)}
          </SubMenu>
        )
      }
    })
  }
  render() {
    const {pathname} =  this.props.location
    const openKey = pathname.split('/')  //默认展开的项
    const selectedKey = openKey.slice(-1) //默认选中的项
    return (
      <div className="left-Nav">
        <div className="nav-top">
          <img src={logo} alt="图标"/>
          <span>商品管理系统</span>
        </div>
        <div className="nav-bottom">
          <Menu
            selectedKeys={selectedKey}
            defaultOpenKeys={openKey}
            mode="inline"
            theme="dark"
          >
            {this.getMenuNav(menu)}
          </Menu>
        </div>
      </div>
    )
  }
}
export default LeftNav
