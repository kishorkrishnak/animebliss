import {
  CalendarOutlined,
  ClockCircleOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import { faListOl } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import TextTruncate from "react-text-truncate";
import { GlobalContext } from "../../App";
import "./HeroCard.css";
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
  const SharedState = useContext(GlobalContext);
  async function fetchVideo(id) {
    SharedState.setVideoIsLoading(true);
    navigate("/watch/" + id);
  }

  return (
    <>
      <div
        className="herocard-wrapper"
        style={{
          backgroundImage: ` linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3) ),url(${cover})`,
        }}
      >
        <div className="herocard-animeinfo-wrapper">
          <h1 className="herocard-animeinfo-title">{title}</h1>

          <div className="herocard-animeinfo">
            <p className="herocard-animeinfo-item">
              {" "}
              <PlayCircleOutlined /> TV
            </p>
            <p className="herocard-animeinfo-item">
              <FontAwesomeIcon icon={faListOl} /> {epcount} Episodes
            </p>
            <p className="herocard-animeinfo-item">
              <ClockCircleOutlined /> {duration} Minutes
            </p>
            <p className="herocard-animeinfo-item">
              <CalendarOutlined /> {year}
            </p>
          </div>
          <span className="herocard-animeinfo-description">
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
          className="btn herocard-btn-watch"
        >
          <PlayCircleOutlined />
          &nbsp;&nbsp;WATCH
        </button>
      </div>
    </>
  );
};

export default HeaderCarouselCard;
