import {combineReducers} from "redux";
import * as NRChatReducer from "./NRChatReducer";

const reducers = combineReducers({
	NRChatReducer: NRChatReducer.reducer
});

export default reducers;
