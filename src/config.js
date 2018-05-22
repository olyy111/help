import axios from 'axios'
import { Toast } from 'antd-mobile';

axios.interceptors.request.use(function (config) {
  // Toast.loading()
  return config;
}, function (err) {
  Toast.fail('加载失败, 请稍后在试')
  return Promise.reject(err)
});

axios.interceptors.response.use(function (response) {
  return response.data
}, function (err) {
  Toast.fail('加载失败, 请稍后在试')
  return Promise.reject(err)
});

axios.defaults.timeout = 5000