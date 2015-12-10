import {createStore, combineReducers} from "redux";
import * as NRChatReducer from "./NRChatReducer";

let combinedReducers = combineReducers({
	NRChatReducer: NRChatReducer.reducer
});

let store = createStore(combinedReducers);

// configure
store.dispatch(NRChatReducer.setup(pushMessage, pushMessage));
// store.dispatch(NRChatReducer.fetchMessages());

function pushMessage(data){
	store.dispatch(NRChatReducer.pushMessage(data));
}

export { store as default };
