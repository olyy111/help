import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Redirect } from 'react-router-dom'
import { isAuth } from '@/utils/cookie'

@withRouter
@connect(
  state => state.user
)
class AuthRoute extends React.Component {
  render() {
    const {component, ...rest} = this.props
    const Component = component
    return <Route {...rest} render={() => (
      isAuth() ?
        <Component /> :
        <Redirect to="/login" />
    )} />
  }
}

export default AuthRoute