import io from 'socket.io-client'
import {fetchChatMsgList} from '@/api/user'
import {fetchReadMsg} from '@/api/chat'
import Cookies from 'js-cookie'
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
    const userid = Cookies.get('userid')
    switch(action.type) {
        case MSG_LIST:
            console.log(action.payload.msgList)
            return {
                users: action.payload.users, 
                msg: action.payload.msgList,
                read: action.payload.msgList.filter(
                    item => !item.read && userid === item.to
                    ).length
                }
        case MSG_RECEIVE:
            const n = action.payload.to === userid ? 1 : 0
            return {...state, msg: [...state.msg, action.payload], read: state.read + n}
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

function msgRead(payload) {
    return {type: MSG_READ, payload}
}

export function receiveMsg() {
    return (dispatch, getState) => {
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

export function readMsg({from, to}) {
    return dispatch => {
        fetchReadMsg({from, to})
            .then(({isSuccess, data}) => {
                dispatch(msgRead(data))
            })
    }
}

export function getChatMsgList() {
    return (dispatch, getState) => {
        fetchChatMsgList()
            .then(({isSuccess, data}) => {
                if (isSuccess) {
                    dispatch(msgList(data))
                }
            })
    }
}