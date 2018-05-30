import React from 'react'
import { connect } from 'react-redux'
import { getUserList } from '@/reducers/chatusers'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'

@connect(
    state => state,
    { getUserList }
)
export default class extends React.Component {
    componentDidMount() {
        this.props.getUserList({ type: 'genius' })
    }
    render() {
        const list = this.props.chatusers
        console.log(list)
        return (
            <div>
                <WhiteSpace></WhiteSpace>
                <WingBlank>
                    {list.map(item => (
                        <div>
                            <Card key={item._id}>
                                <Card.Header
                                    thumb={require(`../../assets/imgs/avatars/${item.avatar}.png`)}
                                    title={item.user}
                                    extra={item.company}
                                ></Card.Header>
                                <Card.Body>{item.desc}</Card.Body>
                            </Card>
                            <WhiteSpace></WhiteSpace>
                        </div>
                    ))}
                </WingBlank>
            </div>
        )
    }
}