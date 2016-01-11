let dev = true;

export const SERVER_URL = dev ? "http://localhost:8080" : location.origin;
export const SERVER_FETCH_MESSAGE = SERVER_URL + "/api/messages";
export const SERVER_FETCH_SESSION = SERVER_URL + "/api/session";
export const SERVER_LOGIN = SERVER_URL + "/login";
export const SERVER_LOGOUT = SERVER_URL + "/logout";
export const SERVER_REGISTER = SERVER_URL + "/register";
