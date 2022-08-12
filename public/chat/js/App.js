import {animations} from "./helpers/animations.js"
import {logout} from "./helpers/logout.js"
import {store} from "./state/state.js"

export const app = () => {
	console.log(store.getState())
	animations(store)
	logout()
}
