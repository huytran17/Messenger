import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import React from "react";
import { io } from "socket.io-client";

class App extends React.Component {
  componentDidMount() {
    // eslint-disable-next-line
    const socket = io("http://localhost:4000");

    axios
      .get("/test")
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
