import axios from "axios";
import Crypto from "crypto-js";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
import { io } from "socket.io-client";
import { selectLoggedUser } from "./app/slices/authSlice";
import {
  ForgetPwd,
  Login,
  Register,
  ResetPassword,
  VerifyCode
} from "./components/auth/index";
import { Home } from "./components/Layout/index";
import { CONF } from "./config/app";
import AuthContext from "./ctx/authCtx";

axios.interceptors.request.use(
  function (config) {
    config.withCredentials = true;

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

const useProvideAuth = () => {
  const loggedUser = useSelector(selectLoggedUser);

  return { loggedUser };
};

const useAuth = () => {
  return useContext(AuthContext);
};

const ProtectedRoute = ({ children, ...restProps }) => {
  var authData = null;

  const token = reactLocalStorage.get("token");

  if (token) {
    const now = Date.now();

    const bytes = Crypto.AES.decrypt(token, CONF.TOKEN_SECRET);

    authData = JSON.parse(bytes.toString(Crypto.enc.Utf8));

    if (now > authData.eat) reactLocalStorage.remove("token");
  }

  return (
    <Route
      {...restProps}
      render={({ location }) =>
        authData && authData.value ? (
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

class App extends React.Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
    this.socket = io("http://localhost:8000");
  }

  componentDidUpdate() {
    console.log("did update");
  }

  render() {
    return (
      <div className="App">
        <AuthProvider>
          <Switch>
            <ProtectedRoute path="/" exact>
              <Home />
            </ProtectedRoute>
            <ProtectedRoute path="/home">
              <Home />
            </ProtectedRoute>
          </Switch>
        </AuthProvider>
        <Switch>
          <Route path="/auth/login" component={Login} />
          <Route path="/auth/register" component={Register} />
          <Route path="/auth/forget-password" component={ForgetPwd} />
          <Route path="/auth/verify-code" component={VerifyCode} />
          <Route path="/auth/reset-password" component={ResetPassword} />
        </Switch>
      </div>
    );
  }
}

export default App;
