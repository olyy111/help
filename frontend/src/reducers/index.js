import { combineReducers } from "redux";
import user from './user'
import chatusers from './chatusers'
import isLoad from './load'
import chat from './chat'
export default combineReducers({
  user,
  chatusers,
  isLoad,
  chat
})