import * as actions from './actions.js'
import {SinglyLinkedList} from "/js/models/singlyLinkedList.js"


function selectedMessages(state = new SinglyLinkedList(), action) {
  switch (action.type) {
    case actions.SELECT_MESSAGE:
      
      state.insert(action.messageId)

      return Object.assign(new SinglyLinkedList(), state)

    case actions.UNSELECT_MESSAGE:
    
      state.remove(action.messageId)

      return Object.assign(new SinglyLinkedList(), state)

    case actions.UNSELECT_ALL:
      
      return new SinglyLinkedList()
    
    default:
      return state
  }
}

const appState = Redux.combineReducers({
  selectedMessages
})

export {appState}