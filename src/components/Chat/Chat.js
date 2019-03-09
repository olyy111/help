import React from 'react'
import {withRouter} from 'react-router-dom'
import {InputItem, Button} from 'antd-mobile'
import io from 'socket.io-client'


@withRouter
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {text: ''}
  }
  componentDidMount() {
    // 如果要用两台机器去方便调试， 写成动态的
    const socket = io(`ws://${window.location.hostname}:9999`)
  }
  render() {
    {this.props.match.params.user}
    return (
      <div>
        <InputItem 
          className="stick-footer"
          value={this.state.text}
          onChange={v => this.setState({text: v})}
          extra={<span>发送</span>}
        >
        </InputItem>
      </div>
    )
  }
}