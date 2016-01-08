import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import NRChatReducer from "./NRChatReducer";
import * as Actions from "../actions/Actions";

export function createMainStore(){
	let finalCreateStore = applyMiddleware(thunk)(createStore);

	let combinedReducers = combineReducers({
		NRChatReducer: NRChatReducer
	});

	let store = finalCreateStore(combinedReducers);

	store.dispatch(Actions.setup({
		onChat: getMessage,
		onError: getMessage,
		onJoin: getMessage,
		onLeave: getMessage
	}));

	return store;
}

function getMessage(data, event){
	data.event = event;
	store.dispatch(Actions.receiveMessage(data));
}
