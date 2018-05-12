import React from 'react'
import axios from 'axios'
import Logo from '@/components/logo/index'
import { InputItem, WingBlank, Radio, WhiteSpace } from 'antd-mobile'

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      type: 'genius'
    }
  }
  componentDidMount() {
    axios.get('/test')
      .then((res) => {
          console.log(res.data)
      })
  }
  render () {
    const RadioItem = Radio.RadioItem
    return  (
      <div>
        <Logo />
        <WingBlank>
          <InputItem>用户名</InputItem>
          <InputItem>密码</InputItem>
          <InputItem>确认密码</InputItem>
          <WhiteSpace></WhiteSpace>
          <RadioItem checked={this.state.type === 'genius'} >牛人</RadioItem>
          <RadioItem>BOSS</RadioItem>
        </WingBlank>
      </div>
    )
  }
}
export default Register