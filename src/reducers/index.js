import { combineReducers } from "redux";
import user from './user'
import chatusers from './chatusers'


export default combineReducers({
  user,
  chatusers
})