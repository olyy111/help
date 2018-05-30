import React from 'react'
import { withRouter } from 'react-router-dom'

let history;
@withRouter
export class Hack extends React.Component {
  componentDidMount() {
    history = this.prop.history
  }
  render(){
    return null
  }
}
export default history
