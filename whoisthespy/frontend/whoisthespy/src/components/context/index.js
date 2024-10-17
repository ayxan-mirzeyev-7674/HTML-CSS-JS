import { createContext } from "react";
import { io } from "socket.io-client";

const socketIP = "http://192.168.52.150:8000";

export const socket = io(socketIP);
export const SocketContext = createContext();
