import "./App.css";
import React from "react";
import { io } from "socket.io-client";
import { Home } from "./components/Layout/index";
import { Switch, Route } from "react-router-dom";
import { Login } from "./components/auth/index";
import { Register } from "./components/auth/index";
import { ForgetPwd } from "./components/auth/index";
import { VerifyCode } from "./components/auth/index";
import { ResetPassword } from "./components/auth/index";
import axios from "axios";
import AuthContext from "./ctx/authCtx";

class App extends React.Component {
  async componentDidMount() {
    // eslint-disable-next-line
    const socket = io("http://localhost:8000");

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
  }
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/home" component={Home} />
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
