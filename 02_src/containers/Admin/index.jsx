import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class Admin extends Component {
  render() {
    if (!this.props.isLogin) {
      return <Redirect to="/login" />
    }
    return (
      <div>
        Admin,{this.props.username}
      </div>
    )
  }
}

export default connect(
  (state)=>({
    username:state.userInfo.user.username,
    isLogin:state.userInfo.isLogin
  }),
  {}
)(Admin)
