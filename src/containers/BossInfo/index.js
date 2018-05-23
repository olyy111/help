import React from 'react'
import { NavBar, InputItem } from 'antd-mobile'
import AvatarSelector from '@/components/avatarSelector/index'

export default class extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            title: ''
        }
    }
    render() {
        return (
            <div>
                <NavBar mode="dark">牛人信息</NavBar>
                <AvatarSelector></AvatarSelector>
                <InputItem model={this.state.title}>招聘职位</InputItem>

            </div>
        )
    }
}