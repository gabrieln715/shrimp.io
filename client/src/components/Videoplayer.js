import React, { Component } from "react";
import YouTube from "react-youtube";
import SearchBar from "./SearchBar";
import Axios from "axios";
// import APIKEY from "../apikey";
import Playlist from "./Playlist";
import io from "socket.io-client";



const endpoint = "localhost:4001";
let socket = io(endpoint);

class Videoplayer extends Component {
  constructor() {
    super();
    this.state = {
      video: "zGP6zk7jcrQ",
      value: "",
      searchresult: [],
      youtube: "",
      time: 0
    };
  }
  handleSearchChange = event => {
    this.setState({ value: event.target.value });
  };

  handleSearchSubmit = event => {
    if (this.state.value.includes("watch?v=")) {
      let id = this.state.value.split("watch?v=")[1];
      socket.emit("changeVideo", { video: id });
    } else {
      Axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${this.state.value}&key=${ENV_VAR_APIKEY}`
      )
        .then(data => this.setState({ searchresult: data.data.items }))
        .catch(err => console.log(err));
    }
    event.preventDefault();
  };

  handleVideoClick = id => {
    socket.emit("changeVideo", { video: id });
  };

  componentDidMount() {
    const endpoint = "localhost:4001";
    let socket = io(endpoint);
    socket.on("play", () => {
      this.state.youtube.playVideo();
    });
    socket.on("pause", () => {
      this.state.youtube.pauseVideo();
    });
    socket.on("changeVideo", ({ video }) => {
      this.setState({ video }, () => {
        window.scrollTo(0, 0);
      });
    });
    socket.on("seek", ({ time }) => {
      this.setState({ time: time }, () => {
        this.state.youtube.seekTo(time);
      });
    });
  }
  render() {
    const opts = {
      height: "600",
      width: "800",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        modestbranding: 1,
        enablejsapi: 1,
        origin: "http://localhost:3000/",
        iv_load_policy: 3
      }
    };

    return (
      <div>
        <SearchBar
          handleChange={this.handleSearchChange}
          handleSubmit={this.handleSearchSubmit}
          value={this.state.value}
        />
        <YouTube
          videoId={this.state.video}
          opts={opts}
          onReady={this.onReady}
          onPlay={this.onPlay}
          onPause={this.onPause}
          onStateChange={this.onStateChange}
        />
        <Playlist
          list={this.state.searchresult}
          onClick={this.handleVideoClick}
        />
      </div>
    );
  }

  onReady = event => {
    this.setState({ youtube: event.target }, () => {
      this.state.youtube.pauseVideo();
    });
  };

  onPlay = event => {
    this.state.youtube.playVideo();
    socket.emit("play");
  };

  onPause = event => {
    this.state.youtube.pauseVideo();
    socket.emit("pause");
  };

  onStateChange = event => {
    let time = Math.floor(this.state.youtube.getCurrentTime());
    if (this.state.time !== time) {
      socket.emit("seek", { time });
    }
  };
}

export default Videoplayer;
