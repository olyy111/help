import axios from 'axios'
import { Toast } from 'antd-mobile';
import { History } from 'react-router'
import createHistory from 'history/createBrowserHistory'

const history = createHistory()


axios.interceptors.request.use(function (config) {
  return config;
}, function (err) {
  Toast.fail('加载失败, 请稍后在试')
  return Promise.reject(err)
});


import { History } from 'react-router'
import createHistory from 'history/createBrowserHistory'
const history = createHistory()

axios.interceptors.response.use(function (response) {
  history.push('/login')
  return response.data
}, function (err) {
  Toast.fail('加载失败, 请稍后在试')
  return Promise.reject(err)
});

axios.defaults.timeout = 5000