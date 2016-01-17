import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import RootReducer from "../reducers/RootReducer";
import * as NRChatReducer from "../reducers/NRChatReducer";
import * as Actions from "../actions/Actions";

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

function createState(){
	return {
		NRChatReducer: NRChatReducer.createState()
	};
}

let _store = null;

export function createAnotherStore(initState = createState()){
	let newStore = createStoreWithMiddleware(RootReducer, initState);
	setup(newStore);
	return newStore;
}

export function createSingletonStore(){
	if(_store){ return _store; }
	_store = createStoreWithMiddleware(RootReducer, createState());
	setup(_store);
	return _store;
}

function setup(store){
	store.dispatch(Actions.setup({
		onChat: getMessage,
		onError: getMessage,
		onJoin: getMessage,
		onLeave: getMessage
	}));
	store.dispatch(Actions.fetchGuestName());
	function getMessage(data){
		store.dispatch(Actions.receiveMessage(data));
	}
}
