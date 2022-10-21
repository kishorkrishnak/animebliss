import {
  Player,
  Hls,
  DefaultUi,
  Control,
  Controls,
  PlaybackControl,
  Tooltip,
} from "@vime/react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "@vime/core/themes/default.css";
import "@vime/core/themes/light.css";
const AnimePlayer = ({ src, animeInfoUrl, setVideoIsLoading }) => {
  const [url, setUrl] = useState(null);

  const navigate = useNavigate();
  const [savedTime, setSavedTime] = useState(null);
  useEffect(() => {
    if (localStorage.getItem(animeInfoUrl) !== null) {
      setSavedTime(Number(localStorage.getItem(animeInfoUrl)));
    }
    localStorage.setItem("recentlywatched", animeInfoUrl);
  }, []);
  const [time, setTime] = useState(0);
  useEffect(() => {
    if (!src) {
      toast.error("No servers available");
      navigate("/");
      return;
    }
    setUrl(src[0]);
    setVideoIsLoading(false);
  }, [src]);
  const hlsConfig = {
    crossOrigin: "anonymous",
    enableWorker: false,
  };
  return (
    <>
      {time !== null && url && (
        <div>
          <Player
            onVmReady={() => {
              if (savedTime) setTime(savedTime);
            }}
            currentTime={time}
            onVmCurrentTimeChange={(e) => {
              setTime(e.detail);
              localStorage.setItem(animeInfoUrl, e.detail);
            }}
            onVmError={() => {
              if (url === src[1]) {
                toast.error(
                  "Sorry we could'nt play that :( Going back to home "
                );
                navigate("/");
              } else {
                setUrl(src[1]);
              }
            }}
            hlsConfig={hlsConfig}
            theme="dark"
            style={{
              "--vm-player-theme": "rgba(255, 255, 255, .3)",
              "--vm-slider-track-height": "5px",
              "--vm-slider-thumb-height": "5px",
              "--vm-slider-track-focused-height": "6px",
              "--vm-slider-value-color": "#582fcb",
              "--vm-loading-screen-dot-color": "#8230c6",
            }}
            autoplay={true}
          >
            <Hls version="latest" config={hlsConfig}>
              <source
                data-src={url
                  .replace(".360", "")
                  .replace(".480", "")
                  .replace(".720", "")}
                type="application/x-mpegURL"
              />
            </Hls>
            <DefaultUi>
              <Controls
                align="center"
                pin="center"
                justify="space-evenly"
                hideOnMouseLeave={true}
                activeDuration={1000}
              >
                <Control keys="p" label="-15 s">
                  <svg
                    onClick={() => {
                      setTime((prevTime) => prevTime - 15);
                    }}
                    x="0"
                    y="0"
                    height={37}
                    width={37}
                    style={{ padding: 3 }}
                    fill={"white"}
                    version="1"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M1882 4839c-24-12-53-36-66-53s-85-153-160-302l-136-271v-84c0-96 16-137 71-180 52-42 566-308 612-318 131-29 257 72 257 206 0 90-46 156-144 205l-49 25 34 6c430 79 916-41 1282-317 529-398 781-1066 647-1714-73-352-279-704-544-932-126-108-227-175-371-246-217-106-410-159-637-172-317-19-592 34-863 167-349 172-611 432-784 778-102 203-153 401-175 669-12 156-15 167-42 206-16 23-49 52-74 66-38 20-56 23-112 20-82-4-139-39-175-107-20-38-23-59-23-147 0-419 159-880 424-1232 427-565 1077-874 1786-849 722 26 1366 404 1746 1027 371 609 406 1392 90 2035-317 646-930 1088-1639 1181-146 19-496 14-617-9-41-8-76-13-78-12s9 29 23 61c53 117 18 237-84 291-58 30-139 31-199 2z"
                      transform="matrix(.1 0 0 -.1 0 512)"
                    ></path>
                    <path
                      d="M2060 3189c-42-13-451-413-481-471-23-44-25-134-5-181 52-123 232-167 328-80 17 15 18-1 18-388v-405l26-53c67-134 244-158 342-46 23 27 44 63 51 90 7 30 11 248 11 693 0 716 0 718-62 781-17 18-45 39-61 48-38 19-122 25-167 12zM2966 3185c-137-35-283-150-345-273-59-117-63-151-59-596l3-401 27-69c51-133 143-236 262-294 87-43 139-55 236-55 242-1 444 150 517 388 16 54 18 100 18 465 0 438 0 439-57 556-58 120-164 213-294 261-88 31-222 39-308 18zm178-426c13-6 32-25 41-43 14-27 16-71 13-383l-3-351-24-26c-48-51-142-40-170 20-7 17-11 140-11 380v356l29 29c32 32 79 38 125 18z"
                      transform="matrix(.1 0 0 -.1 0 512)"
                    ></path>
                  </svg>
                  <Tooltip>- 10s</Tooltip>
                </Control>
                <PlaybackControl hideTooltip keys="k/" />
                <Control keys="n" label="+ 15s">
                  <svg
                    onClick={() => {
                      setTime((prevTime) => prevTime + 15);
                    }}
                    height={37}
                    width={37}
                    fill={"white"}
                    style={{ padding: 3 }}
                    version="1"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M3060 4844c-117-51-162-180-105-303 14-30 24-55 23-56-2-2-36 3-75 11-262 49-588 36-868-36-600-155-1094-550-1375-1101-232-455-292-980-169-1479 186-756 773-1350 1529-1549 198-52 312-66 540-65 225 0 342 14 536 64 902 232 1559 1044 1591 1965 5 145 4 152-19 195-37 69-94 104-176 108-56 3-74 0-112-20-25-14-58-43-74-66-28-39-30-51-43-204-16-200-34-298-84-450-140-432-453-791-864-994-283-139-551-191-873-172-517 31-1006 313-1297 748-549 822-297 1921 557 2426 292 172 660 256 987 225 167-17 176-21 111-51-134-63-179-214-97-323 43-56 105-87 176-87 50 0 76 11 350 151 163 83 310 164 328 181 48 47 73 107 73 179 0 61-3 67-146 328-80 146-157 282-171 302-51 76-168 110-253 73z"
                      transform="matrix(.1 0 0 -.1 0 512)"
                    ></path>
                    <path
                      d="M2060 3189c-42-13-451-413-481-471-23-44-25-134-5-181 52-123 232-167 328-80 17 15 18-1 18-388v-405l26-53c67-134 244-158 342-46 23 27 44 63 51 90 7 30 11 248 11 693 0 716 0 718-62 781-17 18-45 39-61 48-38 19-122 25-167 12zM2966 3185c-137-35-283-150-345-273-59-117-63-151-59-596l3-401 27-69c51-133 143-236 262-294 87-43 139-55 236-55 242-1 444 150 517 388 16 54 18 100 18 465 0 438 0 439-57 556-58 120-164 213-294 261-88 31-222 39-308 18zm178-426c13-6 32-25 41-43 14-27 16-71 13-383l-3-351-24-26c-48-51-142-40-170 20-7 17-11 140-11 380v356l29 29c32 32 79 38 125 18z"
                      transform="matrix(.1 0 0 -.1 0 512)"
                    ></path>
                  </svg>
                  <Tooltip className="text-xs">+ 10s</Tooltip>
                </Control>
              </Controls>
            </DefaultUi>
          </Player>
          <Toaster position="top-right"></Toaster>
        </div>
      )}
    </>
  );
};
export default AnimePlayer;
