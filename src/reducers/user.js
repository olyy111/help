import { fetchRegister, fetchLogin } from '@/api/user'
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const LOGIN_SUCESS = 'LOGIN_SUCESS'
const ERROR_MSG = 'ERROR_MSG'


// reducer
const initState={
	redirectTo: '',
	isAuth:false,
	msg:'',
	user:'',
	type:'',
	code: ''
}

function getRedirectPath({type, avatar}) {
	let url = type === 'boss' ? '/boss' : '/genius'
	if(!avatar){
		url += 'info'
	}	
	return url
}

export default function user(state = initState, action) {
	switch(action.type){
		case REGISTER_SUCCESS:
			return {...state, isAuth: true, redirectTo: getRedirectPath(action.payload), ...action.payload}
		case LOGIN_SUCESS:
			return {...state, isAuth: true, redirectTo: getRedirectPath(action.payload), ...action.payload}
		case ERROR_MSG:
			return {...state, msg: action.msg}
		default:
			return state
	}
}

//actions
function registerSuccess(data) {
	return { type: REGISTER_SUCCESS, payload: data }
}

function loginSuccess(data) {
	return { type: LOGIN_SUCESS, payload: data }
}

function errorMsg(msg) {
	return { type: ERROR_MSG, msg }
}



export function register({user, pwd, type, rePwd}) {
	if(!user || !pwd || !type){
		return errorMsg('用户名或者密码不能为空')
	}

	if(pwd !== rePwd){
		return errorMsg('两次输入的密码应该一直')
	}

	return dispatch => {
		fetchRegister({user, pwd, type})
			.then((res) => {
				const {data, msg, code} = res
				if(code === 0) {
					dispatch(registerSuccess(data))
				}else if(code === 1){
					dispatch(errorMsg(msg))
				}

			})
			.catch((err) => {
				return errorMsg(err)
			})
	}
}

export function login({user, pwd}) {
	if(!user || !pwd){
		return errorMsg('用户名或者密码不能为空')
	}

	return dispatch => {
		fetchLogin({user, pwd})
			.then((res) => {
				const {data, msg, code} = res
				if(code === 0) {
					dispatch(loginSuccess(data))
				}else if(code === 1){
					dispatch(errorMsg(msg))
				}
			})
			.catch((err) => {
				return errorMsg(err)
			})
	}
}