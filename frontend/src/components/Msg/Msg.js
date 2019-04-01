import React from 'react'
import {connect} from 'react-redux'
import {List, Badge} from 'antd-mobile'
import {getUserId} from '@/utils/cookie'
import { read } from 'fs';

@connect(state => state)
export default class extends React.Component {
  getLastItem(arr) {
    return arr[arr.length-1]
  }
  render() {
    const msgGroup = {}
    this.props.chat.msg.forEach(v => {
      msgGroup[v.chatId] = msgGroup[v.chatId] || []
      msgGroup[v.chatId].push(v)
    })
    const msgGroupList = Object.values(msgGroup)
    const Item = List.Item
    const Brief = Item.Brief
    const userid = getUserId()
    const userList = this.props.chat.users
    return msgGroupList.map(group => {
      const lastItem = this.getLastItem(group)
      const targetId = lastItem.to === userid ? lastItem.from : lastItem.to
      const targetName = userList[targetId].name || ''
      const targetAvatar = userList[targetId].avatar || ''
      const unReadNum = group.filter(v => !v.read && v.to === userid).length
      return (
        <List key={Math.random()}>
          <Item 
            thumb={require(`@/assets/imgs/avatars/${targetAvatar}.png`)}
            extra={<Badge text={unReadNum}></Badge>}
          >
            {lastItem.content}
            <Brief>{targetName}</Brief>
          </Item>
          
        </List>
      )
    })
  }
}