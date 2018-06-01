import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import Cookie from 'js-cookie'

@connect(
  state => state.user
)
class AuthRoute extends React.Component {
  isAuth() {
    console.log('hehehehehhehehe')
    return !!Cookie.get('userid')
  }
  render() {
    console.log(23333333)
    const {component, ...rest} = this.props
    const Component = component
    return <Route {...rest} render={() => (
      this.isAuth() ?
        <Component /> :
        <Redirect to="/login" />
    )} />
  }
}

export default AuthRoute