import axios from 'axios'

export function fetchRegister (params) {
  return axios.post('/user/register', params)
} 

export function fetchUserInfo (params) {
  return axios.post('/user/info', params)
} 

export function fetchLogin (params) {
  return axios.post('/user/login', params)
} 

export function fetchUserUpdate (params) {
  return axios.post('/user/update', params)
} 
