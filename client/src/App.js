import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import VideoPlayer from "./components/Videoplayer";
import SearchBar from "./components/SearchBar";
import Join from "./components/Join";
import Chat from "./components/Chat";
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:4001"
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
  }

  render() {
    const { response } = this.state;
    return (
      <Router>
        <Route path="/" exact component={Join} />
        <Route path="/chat" component={Chat} />
      </Router>
    );
  }
}

export default App;
