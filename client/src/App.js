import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import VideoPlayer from "./components/Videoplayer";
import APIKEY from "./apikey";
import SearchBar from "./components/SearchBar";

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
    socket.on("FromAPI", data => this.setState({ response: data }));
  }

  render() {
    const { response } = this.state;
    return (
      <div>
        <VideoPlayer />
      </div>
    );
  }
}

export default App;
