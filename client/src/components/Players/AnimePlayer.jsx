import React, { useEffect, useState, useRef } from "react";
import "@vime/core/themes/default.css";
import "@vime/core/themes/light.css";
import {
  Control,
  Controls,
  DefaultUi,
  Hls,
  PlaybackControl,
  Player,
  Tooltip,
} from "@vime/react";
import toast from "react-hot-toast";

const AnimePlayer = ({
  src,
  animeInfoUrl,
  setVideoIsLoading,
  onVideoEnded,
  onProgressUpdate,
}) => {
  const [url, setUrl] = useState(null);
  const [serverIndex, setServerIndex] = useState(0);
  const [time, setTime] = useState(0);
  const [savedTime, setSavedTime] = useState(null);
  const playerRef = useRef(null);

  // Load saved playback timestamp
  useEffect(() => {
    if (animeInfoUrl) {
      try {
        const raw = localStorage.getItem(`timestamp_${animeInfoUrl}`);
        if (raw) setSavedTime(Number(raw));
      } catch (e) {
        // Safe fallback
      }
    }
  }, [animeInfoUrl]);

  // Handle source changes
  useEffect(() => {
    if (!src || src.length === 0) {
      toast.error("No video stream found for this episode");
      if (setVideoIsLoading) setVideoIsLoading(false);
      return;
    }

    setUrl(src[0]);
    setServerIndex(0);
    if (setVideoIsLoading) setVideoIsLoading(false);
  }, [src, setVideoIsLoading]);

  const handleTimeChange = (e) => {
    const newTime = e.detail;
    setTime(newTime);

    if (animeInfoUrl && newTime > 2) {
      try {
        localStorage.setItem(`timestamp_${animeInfoUrl}`, String(newTime));
      } catch (e) {
        // Storage full protection
      }
    }

    if (onProgressUpdate && playerRef.current) {
      const duration = playerRef.current.duration || 0;
      onProgressUpdate(newTime, duration);
    }
  };

  const handlePlaybackEnded = () => {
    if (onVideoEnded) {
      onVideoEnded();
    }
  };

  const handleError = () => {
    if (src && serverIndex + 1 < src.length) {
      const nextIndex = serverIndex + 1;
      toast("Switching to backup video server...", { icon: "🔄" });
      setServerIndex(nextIndex);
      setUrl(src[nextIndex]);
    } else {
      toast.error("Playback error on this episode. Please try another episode or refresh.");
    }
  };

  const hlsConfig = {
    crossOrigin: "anonymous",
    enableWorker: false,
  };

  if (!url) {
    return (
      <div style={{ aspectRatio: "16/9", background: "var(--bg-card)", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 12 }}>
        <span style={{ color: "var(--text-muted)" }}>Loading video stream...</span>
      </div>
    );
  }

  return (
    <div className="anime-player-wrapper" style={{ borderRadius: 12, overflow: "hidden", boxShadow: "var(--shadow-lg)" }}>
      <Player
        ref={playerRef}
        onVmReady={() => {
          if (savedTime && savedTime > 5) {
            setTime(savedTime);
            toast(`Resumed at ${Math.floor(savedTime / 60)}:${String(Math.floor(savedTime % 60)).padStart(2, "0")}`, { icon: "⏱️" });
          }
        }}
        currentTime={time}
        onVmCurrentTimeChange={handleTimeChange}
        onVmPlaybackEnded={handlePlaybackEnded}
        onVmError={handleError}
        hlsConfig={hlsConfig}
        theme="dark"
        style={{
          "--vm-player-theme": "rgba(255, 255, 255, .3)",
          "--vm-slider-track-height": "5px",
          "--vm-slider-thumb-height": "6px",
          "--vm-slider-track-focused-height": "6px",
          "--vm-slider-value-color": "var(--accent, #8b5cf6)",
          "--vm-loading-screen-dot-color": "var(--accent, #8b5cf6)",
        }}
        autoplay={true}
      >
        <Hls version="latest" config={hlsConfig}>
          <source
            data-src={url.replace(".360", "").replace(".480", "").replace(".720", "")}
            type="application/x-mpegURL"
          />
        </Hls>
        <DefaultUi>
          <Controls
            align="center"
            pin="center"
            justify="space-evenly"
            hideOnMouseLeave={true}
            activeDuration={1200}
          >
            <Control keys="p" label="-10 s">
              <svg
                onClick={() => setTime((prev) => Math.max(0, prev - 10))}
                height={34}
                width={34}
                style={{ padding: 2, cursor: "pointer" }}
                fill="white"
                viewBox="0 0 512 512"
              >
                <path d="M480 256c0 123.7-100.3 224-224 224S32 379.7 32 256 132.3 32 256 32s224 100.3 224 224zm-224-64c-8.8 0-16 7.2-16 16v96c0 8.8 7.2 16 16 16h64c8.8 0 16-7.2 16-16s-7.2-16-16-16h-48v-80c0-8.8-7.2-16-16-16zm-76 16c0-8.8-7.2-16-16-16s-16 7.2-16 16v96c0 8.8 7.2 16 16 16s16-7.2 16-16v-96z" />
              </svg>
              <Tooltip>-10s</Tooltip>
            </Control>

            <PlaybackControl hideTooltip keys="k/" />

            <Control keys="n" label="+10 s">
              <svg
                onClick={() => setTime((prev) => prev + 10)}
                height={34}
                width={34}
                style={{ padding: 2, cursor: "pointer" }}
                fill="white"
                viewBox="0 0 512 512"
              >
                <path d="M480 256c0 123.7-100.3 224-224 224S32 379.7 32 256 132.3 32 256 32s224 100.3 224 224zm-144-64c-8.8 0-16 7.2-16 16v96c0 8.8 7.2 16 16 16h64c8.8 0 16-7.2 16-16s-7.2-16-16-16h-48v-80c0-8.8-7.2-16-16-16zm-76 16c0-8.8-7.2-16-16-16s-16 7.2-16 16v96c0 8.8 7.2 16 16 16s16-7.2 16-16v-96z" />
              </svg>
              <Tooltip>+10s</Tooltip>
            </Control>
          </Controls>
        </DefaultUi>
      </Player>
    </div>
  );
};

export default AnimePlayer;
