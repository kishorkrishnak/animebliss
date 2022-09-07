import ReactPlayer from "react-player";
import { useLocation } from "react-router-dom";

export default function HlsPLayer({url}) {
  const loc = useLocation();
  return (
    <ReactPlayer
      height="95%"
     
      width="95%"
      controls={true}
      playing={true}
      url={url}
    />
  );
}
