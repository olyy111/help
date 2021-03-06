import axios from 'axios'

export function fetchRegister (params) {
  return axios.post('/user/register', params)
} 

export function fetchLogin (params) {
  return axios.post('/user/login', params)
} 

export function fetchUserUpdate (params) {
  return axios.post('/user/update', params)
} 

export function fetchUserList(params) {
  return axios.get('/user/list', { params })
}

export function fetchUserInfo(params) {
  return axios.get('/user/info', { params })
}

export function fetchChatMsgList(params) {
  return axios.get('/user/chatMsgList', { params })
}
