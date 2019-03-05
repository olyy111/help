import React from 'react'
import {withRouter} from 'react-router-dom'

@withRouter
export default class extends React.Component {
  render() {
    return <div>{this.props.match.params.user}</div>
  }
}