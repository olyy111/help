import React from 'react'
import { Result, List, WhiteSpace, WingBlank } from 'antd-mobile'
import { connect } from 'react-redux'
import Cookie from 'js-cookie'
@connect(
  state => state.user
)
export default class extends React.Component {

  constructor(props){
    super(props)
  }
  handleLogout = () => {
    console.log('logout')
    Cookie.remove('userid')
  }
  render() {
    const Item = List.Item
    const Brief = Item.Brief
    return (
        <div>
          <WhiteSpace></WhiteSpace>
          {
            
            <Result
              img={this.props.avatar && <img style={{width: '40px'}} src={require(`../../assets/imgs/avatars/${this.props.avatar}.png`)} alt="" />}
              title={this.props.user}
              message={this.props.company && <div>{this.props.company}</div>}
            />
          }
          <List renderHeader={ () => '简介'}>
            <Item>
              {this.props.title}
            </Item>
            <Item>
              <Brief>
                {this.props.desc && this.props.desc.split('\n').map(item => (
                  <div>{item}</div>
                ))}
                {this.props.money && <div>{this.props.money}</div>}
              </Brief>
            </Item>
            
            </List>
            <WhiteSpace></WhiteSpace>
            <List>
              <Item onClick={this.handleLogout}>
                  退出登录
              </Item>
            </List>
        </div>
    )
  }
}