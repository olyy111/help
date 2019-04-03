import React from 'react'
import {withRouter} from 'react-router-dom'
import {InputItem, Button, NavBar, List, Icon, Grid} from 'antd-mobile'
import {sendMsg, getChatMsgList, receiveMsg, readMsg} from '@/reducers/chat'
import {connect} from 'react-redux'
import {getChatId} from '@/utils/index'
import {getUserId} from '@/utils/cookie'
import emojis from './emojis'

@connect(
  state => state,
  {sendMsg, getChatMsgList, receiveMsg, readMsg}
)
@withRouter
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {text: '', msg: [], isShowEmojis: false}
  }
  componentDidMount() {
    this.props.getChatMsgList()
    this.fixCarousel()
  }
  componentWillUnmount() {
    this.props.readMsg({
      from: this.props.match.params.user,
      to: getUserId()
    })
  }
  handleSendMsg = () => {
    console.log(this.state.text)
    const from = this.props.user._id
    const to = this.props.match.params.user
    const content = this.state.text
    this.props.sendMsg({from, to, content})
    this.setState({text: ''})
  }
  fixCarousel() {
    setTimeout( () => {
      window.dispatchEvent(new Event('resize'))
    }, 0)
  }
  render() {
    const Item = List.Item
    const toId = this.props.match.params.user
    const users = this.props.chat.users
    const chatId = getChatId(toId, this.props.user._id)
    const chatMsgs = this.props.chat.msg.filter(item => item.chatId === chatId)

    if (users.length === 0) {
      return null
    }
    const emojisData = emojis
      .split(' ')
      .filter(v => v)
      .map(v => ({text: v}))
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
                ? <Item key={Math.random()} thumb={avatar}>{item.content}</Item>
                : <Item key={Math.random()} className="chat-me" extra={<img src={avatar} />}>{item.content}</Item>
            )
          })}
        </List>
        <div className="stick-footer">
          <InputItem
            placeholder="请输入"
            value={this.state.text}
            onChange={v => this.setState({text: v})}
            extra={(
              <div>
                <span onClick={() => {
                  this.setState({isShowEmojis: !this.state.isShowEmojis})
                  this.fixCarousel()
                }}>😃</span>
                <span style={{margin: 5}} onClick={this.handleSendMsg}>发送</span>
              </div>
            )}
          />
          {
            this.state.isShowEmojis
              ? <Grid
                onClick={el => {
                  console.log(el)
                  this.setState({
                    text: this.state.text + el.text,
                    isShowEmojis: !this.state.isShowEmojis,
                  })
                }}
                data={emojisData}
                columnNum={9}
                isCarousel={true}
                carouselMaxRow={4}
              ></Grid>
              : null
          }
          
        </div>
      </div>
    )
  }
}