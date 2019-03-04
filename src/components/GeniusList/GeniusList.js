import React from 'react'
import UserCard from '../UserCard/UserCard'
import {getUserList} from '@/reducers/chatusers'
import {connect} from 'react-redux'

@connect(state => state, {getUserList})
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {userlist: []}
  }
  componentDidMount() {
    console.log(getUserList)
    this.props.getUserList({ type: 'genius' })
  }
  render() {
    console.log(this.props)
    return <UserCard userlist={this.props.chatusers}></UserCard>
  }
}