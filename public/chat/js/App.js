import {animations} from "./helpers/animations.js"
import {store} from "./state/state.js"

export const app = () => {
	console.log(store.getState())
	animations(store)
}
