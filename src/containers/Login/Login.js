import React from 'react'
import Logo from '@/components/logo'
import { connect } from 'react-redux'
import { login } from '@/reducers/user.reducer'
import { InputItem, WingBlank, Radio, WhiteSpace, Button } from 'antd-mobile'

@connect(
  state => state.user,
  { login }
)
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
          <Button type="primary" onClick={() => {this.props.login({user: 1, pwd: 2})}}>登录</Button>
          <WhiteSpace></WhiteSpace>
          <Button type="primary" onClick={() => {this.props.history.push('/register')}}>还没有注册? 现在去</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Login