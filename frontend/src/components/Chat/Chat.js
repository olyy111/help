import React from 'react'
import {withRouter} from 'react-router-dom'
import {InputItem, Button, NavBar, List, Icon} from 'antd-mobile'
import {sendMsg, getChatMsgList, receiveMsg} from '@/reducers/chat'
import {connect} from 'react-redux'
import {getChatId} from '@/utils/index'

@connect(
  state => state,
  {sendMsg, getChatMsgList, receiveMsg}
)
@withRouter
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {text: '', msg: []}
  }
  componentDidMount() {
		this.props.getChatMsgList()
		// this.props.receiveMsg()
	}
  handleSendMsg = () => {
    console.log(this.state.text)
    const from = this.props.user._id
    const to = this.props.match.params.user
    const content = this.state.text
    this.props.sendMsg({from, to, content})
    this.setState({text: ''})
  }
  render() {
    const Item = List.Item
    const toId = this.props.match.params.user
    const users = this.props.chat.users
    const chatId = getChatId(toId, this.props.user._id)
    console.log(chatId)
    const chatMsgs = this.props.chat.msg.filter(item => item.chatId === chatId)

    if (users.length === 0) {
      return null
    }
    return (
      <div className="chat-page">
        <NavBar
          icon={<Icon type="left" />}
          onLeftClick={() => {
            this.props.history.go(-1)
          }}
        >
          {users[toId].name}
        </NavBar>
        <List>
          {chatMsgs.map(item => {
            const avatar = require(`@/assets/imgs/avatars/${users[item.from].avatar}.png`)
            return (
              item.from === toId 
                ? <Item key={item._id} thumb={avatar}>{item.content}</Item>
                : <Item key={item._id} className="chat-me" extra={<img src={avatar} />}>{item.content}</Item>
            )
          })}
        </List>
        <InputItem 
          className="stick-footer"
          placeholder="请输入"
          value={this.state.text}
          onChange={v => this.setState({text: v})}
          extra={<span onClick={this.handleSendMsg}>发送</span>}
        >
        </InputItem>
      </div>
    )
  }
}