import { fetchUserList } from '@/api/user'
const USER_LIST = 'USER_LIST'

//reducer
export default function(state = [], action) {
  switch(action.type){
    case USER_LIST:
      return [...action.payload]
    default:
      return state
  }
}

//action creators

function userList(data) {
  console.log(data)
  return {type: USER_LIST, payload: data}
}

export function getUserList(params) {
	return dispatch => {
		fetchUserList(params)
			.then(res => {
        if(res.code === 0){

          dispatch(userList(res.data))
        }
			})
	}
}