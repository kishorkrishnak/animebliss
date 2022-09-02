import {
  PlayCircleOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { faListOl } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CarouselCard({
  duration,
  cover,
  title,
  year,
  descr,
  ep,
}) {
  return (
    <div
      className="header-card"
      style={{
        background: ` linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3) ),url(${cover}),center`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundBlendMode: " brightness(60%)",
      }}
    >
      <div className="anime-info-div">
        <h1 className="anime-title">{title !== "" && title}</h1>

        <div className="anime-info">
          <p>
            {" "}
            <PlayCircleOutlined /> TV
          </p>
          <p>
            <FontAwesomeIcon icon={faListOl} /> {ep} Episodes
          </p>
          <p>
            <ClockCircleOutlined /> {duration} Minutes
          </p>
          <p>
            <CalendarOutlined /> {year}
          </p>
        </div>
        <p className="anime-descr">{descr}</p>
      </div>
      <a className="btn btn-watchnow" href="/login">
        {" "}
        <PlayCircleOutlined /> Watch Now
      </a>
    </div>
  );
}
