import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import AvatarSelector from '@/components/AvatarSelector/AvatarSelector'
import { update } from '@/reducers/user'

@connect(
    state => state.user,
    { update }
)
export default class extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            title: '',
            company: '',
            money: '',
            desc: '',
            avatar: ''
        }
    }
    handleChange(key, value) {
        this.setState({ [key]: value })
    }

    render() {
        return (
            <div>
                {this.props.redirectTo && <Redirect to={this.props.redirectTo} />}
                <NavBar mode="dark">牛人信息</NavBar>
                <AvatarSelector
                    selectAvatar={imgname => { this.setState({avatar: imgname}) }}
                    avatar={this.state.avatar}
                ></AvatarSelector>
                <InputItem 
                    onChange={ v => this.handleChange('company', v)

                }>招聘公司</InputItem>
                <InputItem 
                    onChange={ v => this.handleChange('title', v) }
                >招聘职位</InputItem>
                <InputItem 
                    onChange={ v => this.handleChange('money', v) }
                >岗位薪资</InputItem>
                <TextareaItem
                    title="岗位介绍"
                    placeholder="auto focus in Alipay client"
                    onChange={ v => this.handleChange('desc', v)}
                    rows="4"
                />
                <Button type="primary" onClick={() => this.props.update(this.state)}>保存</Button>
            </div>
        )
    }
}