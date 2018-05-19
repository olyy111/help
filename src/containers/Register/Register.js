import React from 'react'
import axios from 'axios'
import Logo from '@/components/logo/index'
import { connect } from 'react-redux'
import { InputItem, WingBlank, Radio, WhiteSpace, Button } from 'antd-mobile'
import { register } from '@/reducers/user.reducer'

@connect(
  state => state.user,
  { register }
)
class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      pwd: '',
      rePwd: '',
      type: 'genius'
    }
  }
  componentDidMount() {
    axios.get('/test')
      .then((res) => {
          this.setState()
      })
  }
  handleChange (key, value) {
      this.setState({
        [key]: value
      })
  }

  handleRegister = () => {
      this.props.register(this.state)
  }

  render () {
    const RadioItem = Radio.RadioItem
    return  (
      <div>
        <Logo />
        <WingBlank>
          <InputItem 
            placeholder="请输入用户名"
            onChange={v=>this.handleChange('user', v)}
          >用户名</InputItem>
          <InputItem
            placeholder="请输入密码"
            onChange={v=>this.handleChange('pwd', v)}
          >密码</InputItem>
          <InputItem
            placeholder="请再次输入密码"
            onChange={v=>this.handleChange('rePwd', v)}
          >确认密码</InputItem>
          <WhiteSpace></WhiteSpace>
          <RadioItem 
            checked={this.state.type === 'genius'} 
            onClick={v=>this.handleChange('type', 'genius')}
          >牛人</RadioItem>
          <RadioItem 
            checked={this.state.type === 'boss'} 
            onClick={v=>this.handleChange('type', 'boss')}
          >BOSS</RadioItem>
        </WingBlank>
        <WhiteSpace></WhiteSpace>
        <WingBlank>
          <Button type="primary" onClick={this.handleRegister}>注册</Button>
          <WhiteSpace></WhiteSpace>
          <Button type="primary" onClick={() => {this.props.history.push('/login')}}>已经注册了？去登录</Button>
        </WingBlank>
      </div>
    )
  }
}
export default Register