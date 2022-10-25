import {
  PlayCircleOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import "./HeaderCard.css";
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

  return (
    <>
      <div
        className="headercard-wrapper"
        style={{
          backgroundImage: ` linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3) ),url(${cover})`,
        }}
      >
        <div className="headercard-animeinfo-wrapper">
          <h1 className="headercard-animeinfo-title">{title}</h1>

          <div className="headercard-animeinfo">
            <p className="headercard-animeinfo-item">
              {" "}
              <PlayCircleOutlined /> TV
            </p>
            <p className="headercard-animeinfo-item">
              <FontAwesomeIcon icon={faListOl} /> {epcount} Episodes
            </p>
            <p className="headercard-animeinfo-item">
              <ClockCircleOutlined /> {duration} Minutes
            </p>
            <p className="headercard-animeinfo-item">
              <CalendarOutlined /> {year}
            </p>
          </div>
          <span className="headercard-animeinfo-description">
            {" "}
            <TextTruncate
              text={description
                .substring(
                  0,
                  description.indexOf("(") === -1
                    ? description.length
                    : description.indexOf("(")
                )
                .replaceAll(/<\/?[\w\s]*>|<.+[\W]>/g, "")}
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
