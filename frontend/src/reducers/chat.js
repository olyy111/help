import io from 'socket.io-client'
import {fetchChatMsgList} from '@/api/user'
const socket = io(`ws://${window.location.hostname}:9999`)
const MSG_LIST = 'MSG_LIST'
const MSG_RECEIVE = 'MSG_RECEIVE'
const MSG_READ = 'MSG_READ'

const initalData = {
    msg: [],
    read: 0,
}

export default function (state = initalData, action) {
    switch(action.type) {
        case MSG_LIST:
        case MSG_RECEIVE:
        case MSG_READ:
        default:
            return state
    }
}

function msgList(payload) {
    return {type: MSG_LIST, payload}
}

export function getChatMsgList() {
    return dispatch => {
        fetchChatMsgList()
            .then(res => {
                dispatch(msgList(re))
            })
    }
}