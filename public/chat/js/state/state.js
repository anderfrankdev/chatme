import {appState} from './reducers.js'

const store = Redux.createStore(appState)

store.subscribe(()=>{
	console.log(store.getState())
})

export{
	store
}