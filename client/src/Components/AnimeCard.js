import {
  PlayCircleOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { faListOl } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AnimeCard({
  title,
  image,
  stretchedA,

  episodeNum,
}) {
  return (
    <div
      className="animecard-wrapper"
      style={{
   
        display: "flex",
 
        flexDirection: "column",
        alignItems: "center",
        height:"fit-content",
       
        justifyContent: "center",
        textAlign:"center",
        

      }}
    >
      <div
        style={{
       
          borderRadius: "10px",
          backgroundImage: `url(${image})`,
          height: stretchedA ? "340px" : "240px",
          width: stretchedA ? "230px" : "430px",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      ></div>

      {episodeNum > 0 && (
        <h5 style={{ color: "white", fontWeight: "lighter" }}>
          Episode {episodeNum}
        </h5>
      )}

      <h4 className="anime-card-title" style={{ color: "white", fontWeight: "lighter" }}>{title}</h4>
    </div>
  );
}
