import React from 'react'
import { NavBar } from 'antd-mobile'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'
import NavLink from '@/components/NavLink/NavLink'
import Boss from '@/containers/Boss/Boss'
import My from '@/containers/My/My'
import GeniusList from '@/components/GeniusList/GeniusList'
import BossList from '@/components/BossList/BossList'
import Msg from '@/components/Msg/Msg'
import {getChatMsgList, receiveMsg} from '@/reducers/chat'

@withRouter
@connect(
	state => state,
	{getChatMsgList, receiveMsg}
)
export default class extends React.Component {
	constructor(props) {
		super(props)
	}
	componentDidMount() {
		// if (this.props.chat.msg.length === 0) {
			this.props.getChatMsgList()
		// }
	}
    render() {
		const user = this.props.user
        const navList = [
			{
				path:'/boss',
				text:'Boss',
				icon:'job',
				title:'Boss列表',
				component:BossList,
				hide:user.type === 'boss'
			},
			{
				path:'/genius',
				text:'牛人',
				icon:'job',
				title:'牛人列表',
				component: GeniusList,
				hide:user.type === 'genius'
			},
			{
				path:'/msg',
				text:'消息',
				icon:'msg',
				title:'消息列表',
				component:Msg
			},
			{
				path:'/me',
				text:'我',
				icon:'user',
				title:'个人中心',
				component:My
			}
        ]
		const pathname = this.props.location.pathname
		const filteredList = navList.filter(item => !item.hide)
		const selectedRoute = filteredList.find(v => pathname === v.path)
        return (
            <div>
                <NavBar className="fixed-header">{selectedRoute && selectedRoute.title}</NavBar>
                <div className="content-wrapper">
                    {filteredList.map(v => (
						<Route key={v.path} path={v.path} component={v.component} />
					))}
				</div>
				<div className="loading" style={{display: this.props.isLoad?'block':'none'}}>
				</div>
                <NavLink data={navList}></NavLink> 
            </div>
        )
    }
}
