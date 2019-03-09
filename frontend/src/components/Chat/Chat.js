import React from 'react'
import {withRouter} from 'react-router-dom'
import {InputItem, Button} from 'antd-mobile'
import io from 'socket.io-client'
const socket = io(`ws://${window.location.hostname}:9999`)

@withRouter
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {text: '', msg: []}
  }
  componentDidMount() {
    socket.on('receivemsg', data => {
      this.setState({msg: [...this.state.msg, data]})
    })
  }
  handleSendMsg = () => {
    console.log(this.state.text)
    socket.emit('sendmsg', this.state.text)
  }
  render() {
    {this.props.match.params.user}
    return (
      <div>
        {this.state.msg.map(item => {
          return <p key={item}>{item}</p>
        })}
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