import { fetchRegister, fetchLogin, fetchUserUpdate, fetchUserInfo } from '@/api/user'
import { startLoad, endLoad } from './load'
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const UPDATE_SUCCESS = 'UPDATE_SUCCESS'
const LOGOUT = 'LOGOUT'
const UPDATE_USERINFO_SUCCESS = 'UPDATE_USERINFO_SUCCESS'

// reducer
const initState = {
	redirectTo: '',
	isAuth: false,
	msg: '',
	user: '',
	type: '',
	code: ''
}

function getRedirectPath({ type, avatar }) {
	let url = type === 'boss' ? '/boss' : '/genius'
	if (!avatar) {
		url += 'info'
	}
	return url
}

export default function user(state = initState, action) {
	switch (action.type) {
		case REGISTER_SUCCESS:
			return { ...state, isAuth: true, redirectTo: getRedirectPath(action.payload), ...action.payload }
		case LOGIN_SUCCESS:
			return { ...state, isAuth: true, redirectTo: getRedirectPath(action.payload), ...action.payload }
		case UPDATE_SUCCESS:
			return { ...state, redirectTo: getRedirectPath(action.payload), ...action.payload }
		case LOGOUT:
			return initState
		case UPDATE_USERINFO_SUCCESS:	
			return { ...state, ...action.payload }
		case ERROR_MSG:
			return { ...state, msg: action.msg }
		default:
			return state
	}
}

//actions creators
function registerSuccess(data) {
	return { type: REGISTER_SUCCESS, payload: data }
}

function loginSuccess(data) {
	return { type: LOGIN_SUCCESS, payload: data }
}

function updateSuccess(data) {
	const { pwd, ...rest } = data
	return { type: UPDATE_SUCCESS, payload: rest }
}

export function logout(){
	return { type: LOGOUT }
}

function updateUserInfo(data) {
	return {type: UPDATE_USERINFO_SUCCESS, payload: data}
}

function errorMsg(msg) {
	return { type: ERROR_MSG, msg }
}

export function register({ user, pwd, type, rePwd }) {
	if (!user || !pwd || !type) {
		return errorMsg('用户名或者密码不能为空')
	}

	if (pwd !== rePwd) {
		return errorMsg('两次输入的密码应该一直')
	}

	return dispatch => {
		fetchRegister({ user, pwd, type })
			.then((res) => {
				const { data, msg, code } = res
				if (code === 0) {
					dispatch(registerSuccess(data))
				} else if (code === 1) {
					dispatch(errorMsg(msg))
				}

			})
			.catch((err) => {
				return errorMsg(err)
			})
	}
}

export function login({ user, pwd }) {
	if (!user || !pwd) {
		return errorMsg('用户名或者密码不能为空')
	}

	return dispatch => {
		fetchLogin({ user, pwd })
			.then((res) => {
				const { data, msg, code } = res
				if (code === 0) {
					dispatch(loginSuccess(data))
				} else if (code === 1) {
					dispatch(errorMsg(msg))
				}
			})
			.catch((err) => {
				return errorMsg(err)
			})
	}
}

export function update(params) {

	return dispatch => {
		fetchUserUpdate(params)
			.then((res) => {
				const { data, msg, code } = res
				if (code === 0) {
					dispatch(updateSuccess(data))
				} else if (code === 1) {
					dispatch(errorMsg(msg))
				}
			})
			.catch((err) => {
				return errorMsg(err)
			})
	}
}

export function getUserInfo(params) {

	return dispatch => {
		dispatch(startLoad())
		fetchUserInfo(params)
			.then((res) => {
				dispatch(endLoad())
				const { data, msg, code } = res
				if (code === 0) {
					dispatch(updateUserInfo(data))
				} else if (code === 1) {
					dispatch(errorMsg(msg))
				}
			})
			.catch((err) => {
				return errorMsg(err)
			})
	}
}