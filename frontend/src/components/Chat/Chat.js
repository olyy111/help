import React from 'react'
import {withRouter} from 'react-router-dom'
import {InputItem, Button} from 'antd-mobile'
import {getChatMsgList, receiveMsg, sendMsg} from '@/reducers/chat'
import {connect} from 'react-redux'

@connect(
  state => state,
  {getChatMsgList, receiveMsg, sendMsg}
)
@withRouter
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {text: '', msg: []}
  }
  componentDidMount() {
    // socket.on('receivemsg', data => {
    //   this.setState({msg: [...this.state.msg, data]})
    // })
    this.props.getChatMsgList()
    this.props.receiveMsg()
  }
  handleSendMsg = () => {
    console.log(this.state.text)
    // socket.emit('sendmsg', this.state.text)
    const from = this.props.user._id
    const to = this.props.match.params.user
    const content = this.state.text
    this.props.sendMsg({from, to, content})
    this.setState({text: 0})
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