import React from "react";
import PlaylistVideo from "./PlaylistVideo";

const Playlist = props => {
  let videos = props.list.map(result => {
    return <PlaylistVideo key={result.id.videoId} id={result.id.videoId} snippet={result.snippet} onClick={props.onClick}/>;
  });
  return <div>Playlist {videos}</div>;
};

export default Playlist;
