import "./App.css";
import axios from "axios";
import React from "react";
import { io } from "socket.io-client";
import { AppBar } from "./components/Layout/index";

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
        <AppBar />
      </div>
    );
  }
}

export default App;
