import "./App.css";
import React, { useContext } from "react";
import { io } from "socket.io-client";
import { Home } from "./components/Layout/index";
import { Switch, Route, Redirect } from "react-router-dom";
import { Login } from "./components/auth/index";
import { Register } from "./components/auth/index";
import { ForgetPwd } from "./components/auth/index";
import { VerifyCode } from "./components/auth/index";
import { ResetPassword } from "./components/auth/index";
import axios from "axios";
import AuthContext from "./ctx/authCtx";
import { useSelector, useDispatch } from "react-redux";
import {
  selectLoggedStatus,
  selectLoggedUser,
  getUserAsync,
} from "./app/slices/authSlice";

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
  const loggedStatus = useSelector(selectLoggedStatus);
  const loggedUser = useSelector(selectLoggedUser);
  const dispatch = useDispatch();

  return (
    <AuthContext.Provider
      value={{
        loggedStatus,
        loggedUser,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

const ProtectedRoute = ({ children, ...restProps }) => {
  const auth = useAuth();

  auth.dispatch(getUserAsync());

  return (
    <Route
      {...restProps}
      render={({ location }) =>
        auth.loggedStatus ? (
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

const App = () => {
  // eslint-disable-next-line
  const socket = io("http://localhost:8000");

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
          <Route path="/auth/login" component={Login} />
          <Route path="/auth/register" component={Register} />
          <Route path="/auth/forget-password" component={ForgetPwd} />
          <Route path="/auth/verify-code" component={VerifyCode} />
          <Route path="/auth/reset-password" component={ResetPassword} />
        </Switch>
      </AuthProvider>
    </div>
  );
};

export default App;
