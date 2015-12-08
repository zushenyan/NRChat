import { createStore, combineReducers } from "redux";

function incReducer(state = {}, action){
	switch(action.type){
		case "INC":
			return Object.assign(state, {
				number: action.number + 1
			});
		default:
			return state;
	}
}

function decReducer(state = {}, action){
	switch(action.type){
		case "DEC":
			return Object.assign(state, {
				number: action.number - 1
			});
		default:
			return state;
	}
}

let combinedReducers = combineReducers({
	reducer1: incReducer,
	reducer2: decReducer
});

let store = createStore(combinedReducers);

store.dispatch({
	type: "INC",
	number: 5
});

store.dispatch({
	type: "DEC",
	number: 5
});

// let store = createStore(function(state = {}, action){
// 	switch(action.type){
// 		case "HELLO":
// 			return Object.assign(state, {
// 				message: action.value
// 			});
// 		default:
// 			return state;
// 	}
// 	return state;
// });

console.log(store);
console.log(store.getState());
