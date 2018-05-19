import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Redirect } from 'react-router-dom'
import { fetchUserInfo } from '@/api/user'
import { isAuth } from '@/utils/cookie'

@withRouter
@connect(
  state => state.user
)



class AuthRoute extends React.Component {
  render() {
    const {component, ...rest} = this.props
    const Component = component
    console.log(isAuth())
    return <Route {...rest} render={() => (
      isAuth() ?
        <Component /> :
        <Redirect to="/login" />
    )} />
  }
}
// class AuthRoute extends React.Component {

//   // 现在所在的路径
//   // 是否登录了
//   // 
//   componentDidMount() {
//     const { pathname } = this.props.location
//     const whiteList = ['/login', '/register']

//     if(whiteList.indexOf(pathname) > -1){
//       return null
//     }            
//     // fetchUserInfo()
//     //   .then(({ code }) => {
//     //     if(code === 0){
          
//     //     }else{
//     //       this.props.history.push('/login')
//     //     }
//     //   })
//   }
//   render () {
    
    


//     return  (
//       <div>
        
//       </div>
//     )
//   }
// }
export default AuthRoute