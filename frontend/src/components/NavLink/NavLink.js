import React from 'react'
import { TabBar } from 'antd-mobile'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import {connect} from 'react-redux'

@connect(state => state.chat)
@withRouter
export default class extends React.Component {
    static propTypes = {
        data: PropTypes.array.isRequired
    }
    render() {
        console.log(this.props.read)
        const pathname = this.props.location.pathname
        const routerList = this.props.data.filter(router => !router.hide)
        return (
            <TabBar>
                {routerList.map(({ path, text, icon, hide }) => (
                    <TabBar.Item
                        badge={path === '/msg' ? this.props.read : 0}
                        title={text}
                        key={text}
                        icon={{uri: require(`./img/${icon}.png`)}}
                        selectedIcon={{uri: require(`./img/${icon}-active.png`)}}
                        selected={pathname === path}
                        onPress={() => {
                            this.props.history.push(path)
                        }}
                    ></TabBar.Item>
                ))}
            </TabBar>
        )
    }
}