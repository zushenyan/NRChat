import {createStore, combineReducers} from "redux";
// import * as PersonReducer from "./PersonReducer";
import * as NRChatReducer from "./NRChatReducer";

let combinedReducers = combineReducers({
	// PersonReducer: PersonReducer.reducer
	NRChatReducer: NRChatReducer.reducer
});

let store = createStore(combinedReducers);

export { store as default };
