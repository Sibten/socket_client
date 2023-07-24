import { io } from "socket.io-client";

const URL = process.env.REACT_APP_SOCKET_URL ?? "";

export const appSocket = io(URL);
