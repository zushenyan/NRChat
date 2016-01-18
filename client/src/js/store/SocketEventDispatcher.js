import SocketEvent from "../env/SocketEvent";
import ClientMessage from "../env/ClientMessage";

function sendJoinInfo(store){
	let username = store.getState().NRChatReducer.username;
	let socket = store.getState().NRChatReducer.socket;
	socket.emit(SocketEvent.JOIN, new ClientMessage(username, "hi"));
}

let SocketEventDisaptcher = {
	sendJoinInfo
};

export default SocketEventDisaptcher;
