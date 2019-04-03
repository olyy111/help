import axios from 'axios'
export function fetchReadMsg(params) {
  return axios.post('/chat/readMsg', params)
}

