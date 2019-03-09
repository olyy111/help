import React from 'react'
import {withRouter} from 'react-router-dom'
import {InputItem, Button} from 'antd-mobile'
import io from 'socket.io-client'
const socket = io(`ws://${window.location.hostname}:9999`)

@withRouter
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {text: ''}
  }
  // componentDidMount() {
  //   const socket = io(`ws://${window.location.hostname}:9999`)
  //   socket.emit('sendmsg', {text: 123})
  // }
  handleSendMsg = () => {
    // console.log(socket)
    socket.emit('sendmsg', this.state.text)
  }
  render() {
    {this.props.match.params.user}
    return (
      <div>
        <InputItem 
          className="stick-footer"
          value={this.state.text}
          onChange={v => this.setState({text: v})}
          extra={<span onClick={this.handleSendMsg}>发送</span>}
        >
        </InputItem>
      </div>
    )
  }
}