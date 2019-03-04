import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { NavBar, InputItem, TextareaItem, Button, Form } from 'antd-mobile'
import AvatarSelector from '@/components/AvatarSelector/AvatarSelector'
import { update } from '@/reducers/user'
import { createForm, formShape } from 'rc-form';

@connect(
    state => state.user,
    { update }
)
@createForm()
export default class extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            title: '',
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
                    onChange={ v => this.handleChange('title', v)
                }>求职意向</InputItem>
                <TextareaItem
                    title="自我介绍"
                    placeholder="auto focus in Alipay client"
                    onChange={ v => this.handleChange('desc', v)}
                    rows="4"
                    autoHeight
                />
                <Button type="primary" onClick={() => this.props.update(this.state)}>保存</Button>
            </div>
        )
    }
}