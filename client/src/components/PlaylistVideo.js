import React from "react";

const PlaylistVideo = props => {
  return (
    <div className="video">
      <div style={{ height: "180px", width: "320px" }}>
        <img
          src={props.snippet.thumbnails.medium.url}
          onClick={() => props.onClick(props.id)}
          style={{ height: "100%", width: "100%" }}
        ></img>
      </div>
      <div style={{ fontWeight: "bold", margin: "5px" }}>
        {props.snippet.title.replace("&#39;", "'")}
      </div>
      <div div style={{ margin: "5px" }}>
        {props.snippet.channelTitle}
      </div>
    </div>
  );
};

export default PlaylistVideo;
