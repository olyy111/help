import React from 'react'
import Logo from '@/components/Logo/Logo'
import { connect } from 'react-redux'
import { login } from '@/reducers/user'
import { InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { Redirect } from 'react-router-dom'
import form from '@/utils/form'

@connect(
  state => state.user,
  { login }
)
@form
class Login extends React.Component {
  constructor(props) {
    super(props)
  }
  render () {
    return  (
      <div>
        {this.props.redirectTo && <Redirect to={this.props.redirectTo} />}
        <Logo />
        <WingBlank>
          <div className="err">{this.props.msg}</div>
        </WingBlank>
        <WingBlank>
          <InputItem 
            onChange={v => this.props.handleChange('user', v)} 
          >用户名</InputItem>
          <InputItem
            onChange={v => this.props.handleChange('pwd', v)}
            type="password"
          >密码</InputItem>
        </WingBlank>
        <WhiteSpace></WhiteSpace>
        <WingBlank>
          <Button type="primary" onClick={() => {this.props.login(this.props.state)}}>登录</Button>
          <WhiteSpace></WhiteSpace>
          <Button type="primary" onClick={() => {this.props.history.push('/register')}}>还没有注册? 现在去</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Login