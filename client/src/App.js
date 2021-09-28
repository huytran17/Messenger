import "./App.css";
import React from "react";
import { io } from "socket.io-client";
import { Home } from "./components/Layout/index";
import { Switch, Route } from "react-router-dom";
import { Login } from "./components/auth/index";

class App extends React.Component {
  componentDidMount() {
    // eslint-disable-next-line
    const socket = io("http://localhost:8000");
  }
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/home" component={Home} />
          <Route path="/auth/login" component={Login} />
        </Switch>
      </div>
    );
  }
}

export default App;
