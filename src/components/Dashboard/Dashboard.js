import React from 'react'
import { NavBar } from 'antd-mobile'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'
import NavLink from '@/components/NavLink/NavLink'
import Boss from '@/containers/Boss/Boss'
import My from '@/containers/My/My'


function Msg(){
	return <h2>消息列表页面</h2>
}

function Genius(){
	return <h2>牛人页面</h2>
}

@withRouter
@connect(
	state => state
)
export default class extends React.Component {
    render() {
        const user = this.props.user
        const navList = [
			{
				path:'/boss',
				text:'牛人',
				icon:'boss',
				title:'牛人列表',
				component:Boss,
				hide:user.type==='genius'
			},
			{
				path:'/genius',
				text:'boss',
				icon:'job',
				title:'BOSS列表',
				component:Genius,
				hide:user.type==='boss'
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
        return (
            <div>
                <NavBar className="fixed-header">{filteredList.find(v => pathname === v.path).title}</NavBar>
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
