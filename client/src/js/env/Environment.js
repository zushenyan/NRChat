let dev = true;

export const SERVER_URL = dev ? "http://localhost:8080" : location.origin;
export const SERVER_FETCH_MESSAGE = SERVER_URL + "/api/messages";
