import axios from 'axios'
import { Toast } from 'antd-mobile';
import history from '@/utils/history'


axios.interceptors.request.use(function (config) {
  return config;
}, function (err) {
  Toast.fail('加载失败, 请稍后在试')
  return Promise.reject(err)
});

axios.interceptors.response.use(function (response) {
  const res = response.data
  if(res.code == 3){
    history.push('/login')
  }
  return res
}, function (err) {
  Toast.fail('加载失败, 请稍后在试')
  return Promise.reject(err)
});

axios.defaults.timeout = 5000