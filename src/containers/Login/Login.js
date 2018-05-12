import React from 'react'
import Logo from '@/components/logo'
import { InputItem, WingBlank, Radio, WhiteSpace, Button } from 'antd-mobile'

class Login extends React.Component {
  constructor(props) {
    super(props)
  }
  render () {
    return  (
      <div>
        <Logo />
        <WingBlank>
          <InputItem>用户名</InputItem>
          <InputItem>密码</InputItem>
        </WingBlank>
        <WhiteSpace></WhiteSpace>
        <WingBlank>
          <Button type="primary">登录</Button>
          <WhiteSpace></WhiteSpace>
          <Button type="primary" onClick={() => {this.props.history.push('/register')}}>注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Login