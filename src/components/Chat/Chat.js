import React from 'react'
import {withRouter} from 'react-router-dom'
import {InputItem, Button} from 'antd-mobile'
import socket from 'socket.io-client'
const io = socket('ws://localhost:9999')

@withRouter
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {text: ''}
  }
  render() {
    {this.props.match.params.user}
    return (
      <div>
        <InputItem 
          className="stick-footer"
          value={this.state.text}
          onChange={v => this.setState({text: v})}
          extra={<span>发送</span>}
        >
        </InputItem>
      </div>
    )
  }
}