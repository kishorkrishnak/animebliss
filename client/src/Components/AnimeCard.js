import {
  PlayCircleOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { faListOl } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AnimeCard({ title, image }) {
  return (
    <div
      className="animecard-wrapper"
      style={{
        padding: "50px",
        display: "flex",
        gap: "10px",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          padding: "50px",
          height: 230,
          borderRadius: "10px",
          backgroundImage: `url(${image})`,
          width: "400px",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      ></div>

      <h3 style={{ color: "white", fontWeight: "lighter" }}>{title}</h3>
    </div>
  );
}
