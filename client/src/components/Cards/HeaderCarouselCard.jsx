import {
  PlayCircleOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import "./HeaderCarouselCard.css";
import { useContext } from "react";
import { faListOl } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextTruncate from "react-text-truncate";
import { SharedStateContext } from "../../App";
import { useNavigate } from "react-router-dom";
const HeaderCarouselCard = ({
  duration,
  cover,
  title,
  id,
  year,
  description,
  epcount,
}) => {
  const navigate = useNavigate();
  const SharedState = useContext(SharedStateContext);
  async function fetchVideo(id) {
    SharedState.setVideoIsLoading(true);
    navigate("/watch/" + id);
  }
  let regexeddescription = description.replaceAll(/<\/?[\w\s]*>|<.+[\W]>/g, "");
  regexeddescription = regexeddescription.substring(
    0,
    regexeddescription.indexOf("("),
    4
  );
  return (
    <>
      <div
        className="header-card"
        style={{
          backgroundImage: ` linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3) ),url(${cover})`,
        }}
      >
        <div className="anime-info-div">
          <h1 className="anime-title">{title !== "" && title}</h1>
          <div className="anime-info">
            <p className="anime-info-item">
              {" "}
              <PlayCircleOutlined /> TV
            </p>
            <p className="anime-info-item">
              <FontAwesomeIcon icon={faListOl} /> {epcount} Episodes
            </p>
            <p className="anime-info-item">
              <ClockCircleOutlined /> {duration} Minutes
            </p>
            <p className="anime-info-item">
              <CalendarOutlined /> {year}
            </p>
          </div>
          <span className="anime-description">
            {" "}
            <TextTruncate
              className="anime-description"
              text={regexeddescription}
              line={4}
            ></TextTruncate>
          </span>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            fetchVideo(id);
          }}
          className="btn btn-watchnow"
        >
          <PlayCircleOutlined />
          &nbsp;&nbsp;WATCH
        </button>
      </div>
    </>
  );
};

export default HeaderCarouselCard;
