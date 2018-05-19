import axios from 'axios'
import { fetchRegister, fetchLogin } from '@/api/user'
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const LOGIN_SUCESS = 'LOGIN_SUCESS'
const ERROR_MSG = 'ERROR_MSG'


// reducer
const initState={
	isAuth:false,
	msg:'',
	user:'',
	type:''
}

export default function user(state = initState, action) {
	switch(action.type){
		case REGISTER_SUCCESS:
			return {...state, isAuth: true, ...action.payload}
		default:
			return state
	}
}

//actions
function registerSuccess(data) {
	return { type: REGISTER_SUCCESS, payload: data }
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
				console.log(res)
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
			.then(res => {
				console.log(res)
			})
	}
}