import React from "react";
import ReactDOM from "react-dom";
import ReactHlsPlayer from "react-hls-player";

export default function VideoPlayer({url}) {
  return (
    <ReactHlsPlayer
      src={url}
      autoPlay={false}
      controls={true}
      width="100%"
      height="auto"
    />
  );
}
