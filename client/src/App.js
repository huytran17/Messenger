import axios from "axios";
import Crypto from "crypto-js";
import React, { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { io } from "socket.io-client";
import {
  ForgetPwd,
  Login,
  Register,
  ResetPassword,
  VerifyCode,
} from "./components/auth/index";
import { Home } from "./components/index";
import { Profile } from "./components/index";
import { CONF } from "./config/app";
import { AuthContext, SocketContext } from "./ctx/appCtx";
import { Server } from "./constants/index";

axios.interceptors.request.use(
  function (config) {
    config.withCredentials = true;

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

  const token =
    sessionStorage.getItem("token") || localStorage.getItem("token");

  if (token) {
    try {
      const now = Date.now();

      const bytes = Crypto.AES.decrypt(token, CONF.TOKEN_SECRET);

      auth = JSON.parse(bytes.toString(Crypto.enc.Utf8)) || null;

      if (now > auth.eat) localStorage.removeItem("token");
    } catch (e) {
      localStorage.removeItem("token");
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

class App extends React.Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    console.log("did update");
  }

  render() {
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
      </div>
    );
  }
}

export default App;
