import React from 'react'
import PropTypes from 'prop-types'
import {Card, WhiteSpace,WingBlank} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

@withRouter
class UserCard extends React.Component{
	static propTypes = {
		userlist: PropTypes.array.isRequired
  }
  handleCardClick = v => {
    this.props.history.push(`/chat/${v._id}`)
  }
	render(){
		const Header = Card.Header
		const Body = Card.Body
		return (
			<WingBlank>
          {this.props.userlist.map(v=>(
            v.avatar ? (
              <div key={v._id}>
                <WhiteSpace></WhiteSpace>
                <Card key={v._id} onClick={() => {this.handleCardClick(v)}}>
                  <Header
                    title={v.user}
                    thumb={require(`@/assets/imgs/avatars/${v.avatar}.png`)}
                    extra={<span>{v.title}</span>}
                  ></Header>
                  <Body>
                    {v.type=='boss'? <div>公司:{v.company}</div> :null}

                    {v.desc.split('\n').map(d=>(
                      <div key={d}>{d}</div>
                    ))}
                    {v.type=='boss'? <div>薪资:{v.money}</div> :null}
                  </Body>
                </Card>
              </div>
            ):null
          ))}
      </WingBlank>
      
		)


	}
}
export default UserCard

