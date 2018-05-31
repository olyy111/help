import React from 'react'
import { fetchUserInfo } from '@/api/user'
import { connect } from 'react-redux'
import { getUserInfo } from '@/reducers/user'
import { withRouter } from 'react-router'

@withRouter
@connect(
  state => state,
  { getUserInfo }
)
export default class extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount(){
    const whiteList = ['/login', 'register']
    const pathname = this.props.location.pathname

    if(whiteList.indexOf(pathname) > -1){
      return null
    }

    this.props.getUserInfo()
  }
  render(){
    return null
  }
}