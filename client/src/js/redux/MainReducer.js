import {createStore, combineReducers, applyMiddleware} from "redux";
import * as NRChatReducer from "./NRChatReducer";

let finalCreateStore = applyMiddleware(thunkMiddleware)(createStore);

let combinedReducers = combineReducers({
	NRChatReducer: NRChatReducer.reducer
});

let store = finalCreateStore(combinedReducers);

// configure
store.dispatch(NRChatReducer.setup({
	onChat: sendMessage,
	onError: sendMessage,
	onHello: sendMessage,
	onBeforeDisconnect: sendMessage
}));

function sendMessage(data, event){
	data.event = event;
	store.dispatch(NRChatReducer.pushMessage(data));
}

function thunkMiddleware({dispatch, getState}){
	return function(next){
		return function(action){
			return typeof action === "function" ? action(dispatch, action) : next(action);
		}
	}
}

export { store as default };
