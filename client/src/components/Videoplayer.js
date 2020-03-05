import React, { Component } from "react";
import YouTube from "react-youtube";
import SearchBar from "./SearchBar";
import Axios from "axios";
import APIKEY from "../apikey";
import Playlist from "./Playlist";

class Videoplayer extends Component {
  constructor() {
    super();
    this.state = {
      video: "zGP6zk7jcrQ",
      value: "",
      searchresult: []
    };
  }
  handleSearchChange = event => {
    this.setState({ value: event.target.value });
  };

  handleSearchSubmit = event => {
    Axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${this.state.value}&key=${APIKEY}`
    )
      .then(data => this.setState({ searchresult: data.data.items }))
      .catch(err => console.log(err));
    event.preventDefault();
  };

  handleVideoClick = id => {
    this.setState({
      video: id
    });
  };
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
          onReady={this._onReady}
        />
        <Playlist
          list={this.state.searchresult}
          onClick={this.handleVideoClick}
        />
      </div>
    );
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
}

export default Videoplayer;
