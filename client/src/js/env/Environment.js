let dev = true;

export const SERVER_URL = dev ? "http://localhost:8080" : location.origin;
export const SERVER_FETCH_MESSAGE = SERVER_URL + "/api/messages";
export const SERVER_FETCH_GUESTNAME = SERVER_URL + "/api/id";
export const SERVER_AUTH = SERVER_URL + "/auth/authenticate";
export const SERVER_SIGNUP = SERVER_URL + "/auth/signup";
