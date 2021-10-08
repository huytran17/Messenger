import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import Crypto from "crypto-js";
import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { io } from "socket.io-client";
import { getUserAsync } from "./app/slices/authSlice";
import { selectIsOpen, toggle } from "./app/slices/backdropSlice";
import {
  ForgetPwd,
  Login,
  Register,
  ResetPassword,
  VerifyCode,
} from "./components/auth/index";
import { Home, Profile } from "./components/index";
import { CONF } from "./config/app";
import { Server } from "./constants/index";
import { AuthContext, SocketContext } from "./ctx/appCtx";

var isOpenBackdrop = false;

axios.interceptors.request.use(
  function (config) {
    config.withCredentials = true;

    isOpenBackdrop = true;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (config) {
    isOpenBackdrop = false;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

const useProvideAuth = () => {
  var auth = null;

  const dispatch = useDispatch();

  const token =
    sessionStorage.getItem("token") || localStorage.getItem("token");

  if (token) {
    try {
      const now = Date.now();

      const bytes = Crypto.AES.decrypt(token, CONF.TOKEN_SECRET);

      auth = JSON.parse(bytes.toString(Crypto.enc.Utf8)) || null;

      if (now > auth.eat) localStorage.removeItem("token");
      else if (auth) dispatch(getUserAsync(auth.id));
    } catch (e) {
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
    }
  }

  return auth;
};

const useAuth = () => {
  return useContext(AuthContext);
};

const ProtectedRoute = ({ children, ...restProps }) => {
  const auth = useAuth();

  return (
    <Route
      {...restProps}
      render={({ location }) =>
        auth && auth.id ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/auth/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

const useSocket = () => {
  return useContext(SocketContext);
};

const useSocketProvide = () => {
  const socket = io(`${Server.URL}:${Server.PORT}`);

  return { socket };
};

const SocketProvider = ({ children }) => {
  const socket = useSocketProvide();

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

const App = () => {
  const dispatch = useDispatch();

  const isOpen = useSelector(selectIsOpen);

  // useEffect(() => {
  //   dispatch(toggle());
  // }, [dispatch]);

  return (
    <div className="App">
      <AuthProvider>
        <SocketProvider>
          <Switch>
            <ProtectedRoute path="/" exact>
              <Home />
            </ProtectedRoute>
            <ProtectedRoute path="/home">
              <Home />
            </ProtectedRoute>
            <ProtectedRoute path="/profile/:id">
              <Profile />
            </ProtectedRoute>
            <ProtectedRoute path="/settings">
              <Home />
            </ProtectedRoute>
          </Switch>
        </SocketProvider>
      </AuthProvider>
      <Switch>
        <Route path="/auth/login" component={Login} />
        <Route path="/auth/register" component={Register} />
        <Route path="/auth/forget-password" component={ForgetPwd} />
        <Route path="/auth/verify-code" component={VerifyCode} />
        <Route path="/auth/reset-password" component={ResetPassword} />
        <Route path="/auth/logout" component={Login} />
      </Switch>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isOpenBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default App;
