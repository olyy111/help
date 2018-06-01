const START_LOAD = 'START_LOAD'
const END_LOAD = 'END_LOAD'

export const startLoad = () => ({type: START_LOAD})

export const endLoad = () => ({type: END_LOAD})

export default function (state = false, action) {
  switch(action.type){
    case START_LOAD:
      return true
    case END_LOAD:
      return false
    default:
      return state
  }
}