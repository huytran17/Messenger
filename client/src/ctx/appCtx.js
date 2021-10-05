import { createContext } from "react";

export const AuthContext = createContext({ id: null, eat: null });

export const SocketContext = createContext({ socket: null });
