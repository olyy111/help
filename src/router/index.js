import React from 'react'
import Login from '@/containers/Login/Login'
import Register from '@/containers/Register/Register'
import BossInfo from '@/containers/BossInfo/index'
import GeniusInfo from '@/containers/GeniusInfo/index'
import AuthRoute from '@/components/authRoute'
import Dashboard from '@/components/dashboard'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import UserInfo from '@/components/UserInfo/UserInfo'

export default function () {
    return (
        <BrowserRouter>
            <div>
                <UserInfo></UserInfo>
                <Switch>
                    <Route path="/bossinfo" component={BossInfo} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/geniusInfo" component={GeniusInfo} />
                    <Route component={Dashboard} />
                </Switch>
            </div>
        </BrowserRouter>
    )
} 

