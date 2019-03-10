import axios from 'axios'
export function fetchChatMsgList(params) {
    return axios.get('/user/chatMsgList', { params })
}