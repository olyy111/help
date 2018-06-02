import React from 'react'
import Login from '@/containers/Login/Login'
import Register from '@/containers/Register/Register'
import BossInfo from '@/containers/BossInfo/BossInfo'
import GeniusInfo from '@/containers/GeniusInfo/GeniusInfo'
import AuthRoute from '@/components/AuthRoute/AuthRoute'
import Dashboard from '@/components/Dashboard/Dashboard'
import { Route, Switch, Router } from 'react-router-dom'
import UserInfo from '@/components/UserInfo/UserInfo'
import history from '@/utils/history'

export default function () {
    return (
        <Router history={history}>
            <div>
                <UserInfo></UserInfo>
                <Switch>
                    <AuthRoute path="/bossinfo" component={BossInfo} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <AuthRoute path="/geniusInfo" component={GeniusInfo} />
                    <AuthRoute component={Dashboard} />
                </Switch>
            </div>
        </Router>
    )
} 

