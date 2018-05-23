import React from 'react'
import Login from '@/containers/Login/Login'
import Register from '@/containers/Register/Register'
import BossInfo from '@/containers/BossInfo/index'
import AuthRoute from '@/components/authRoute'
import { BrowserRouter, Route } from 'react-router-dom'

export default function () {
    return (
        <BrowserRouter>
            <div>
                <Route path="/bossinfo" component={BossInfo} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
            </div>
        </BrowserRouter>
    )
} 

