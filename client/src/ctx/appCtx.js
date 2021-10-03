import { createContext } from "react";

export const AuthContext = createContext({ user: null, eat: null });

export const SocketContext = createContext({ socket: null });
