export const SELECT_MESSAGE = 'SELECT_MESSAGE'
export const UNSELECT_MESSAGE = 'UNSELECT_MESSAGE'
export const UNSELECT_ALL = 'UNSELECT_ALL'

export function selectMessage(messageId){
  return { type: SELECT_MESSAGE, messageId }
}

export function unselectMessage(messageId){
  return { type: UNSELECT_MESSAGE, messageId }
}

export function unselectSeveral(amount="ALL"){
  return { type: UNSELECT_ALL, amount }
}

export const boundSelectMessage = (messageId,store) => store.dispatch(selectMessage(messageId))
export const boundUnselectMessage = (messageId,store) => store.dispatch(unselectMessage(messageId))
export const boundUnselectSeveral = (amount="ALL",store) => store.dispatch(unselectSeveral(amount))

