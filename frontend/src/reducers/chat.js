import io from 'socket.io-client'
import {fetchChatMsgList} from '@/api/user'
const socket = io(`ws://${window.location.hostname}:9999`)
const MSG_LIST = 'MSG_LIST'
const MSG_RECEIVE = 'MSG_RECEIVE'
const MSG_READ = 'MSG_READ'

const initalData = {
    msg: [],
    users: [],
    read: 0,
}

export default function (state = initalData, action) {
    switch(action.type) {
        case MSG_LIST:
            return {users: action.payload.users, msg: action.payload.msgList, read: action.payload.msgList.filter(item => !item.read).length}
        case MSG_RECEIVE:
            return {...state, msg: [...state.msg, action.payload], read: state.read + 1}
        case MSG_READ:
        default:
            return state
    }
}

function msgList(payload) {
    return {type: MSG_LIST, payload}
}
function receive(payload) {
    return {type: MSG_RECEIVE, payload}
}

export function receiveMsg() {
    return dispatch => {
        socket.on('receiveMsg', data => {
            dispatch(receive(data))
        })
    }
}

export function sendMsg(data) {
    return diapatch => {
        socket.emit('sendMsg', data)
    }
}

export function getChatMsgList() {
    return dispatch => {
        fetchChatMsgList()
            .then(({isSuccess, data}) => {
                console.log(isSuccess)
                if (isSuccess) {
                    dispatch(msgList(data))
                }
            })
    }
}