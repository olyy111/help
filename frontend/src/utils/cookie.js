import Cookies from 'js-cookie'

const LOGIN_FLAG = 'isLogin'

export function isAuth () {
  const flag = Cookies.get(LOGIN_FLAG)
  console.log(flag)
  return (flag == 1)
}

export function setUserIdCookie(id) {
  Cookies.set('userid', id)
}

export function getUserId() {
  return Cookies.get('userid')
}
