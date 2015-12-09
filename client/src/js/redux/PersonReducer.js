// initial store
let OtherObj = {
	cat: "meowmeow",
	age: 1
};

let PersonStore = {
	name: "",
	height: 100,
	cat: OtherObj
};

// action constants
const TYPE_SET_NAME = "set name";
const TYPE_SET_HEIGHT = "set height";

// actions
export function setName(name){
	return {
		type: TYPE_SET_NAME,
		name: name
	};
}

export function setHeight(height){
	return {
		type: TYPE_SET_HEIGHT,
		height: height
	};
}

// reducer
export function reducer(state = PersonStore, action){
	switch(action.type){
		case TYPE_SET_NAME:
			return Object.assign(state, {
				name: action.name
			});
		case TYPE_SET_HEIGHT:
			return Object.assign(state, {
				height: action.height
			});
		default:
			return state;
	}
}
