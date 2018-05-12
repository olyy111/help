import axios from 'axios'
import { Toast } from 'antd-mobile';
import { setTimeout } from 'timers';

axios.interceptors.request.use(function (config) {
  Toast.loading()
  return config;
});

axios.interceptors.response.use(function (response) {
  Toast.hide()
  return response;
});