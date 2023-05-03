import Loader from "react-spinners/MoonLoader";

const ClockLoader = (color,videoIsLoading,size) => {
  return (
    <Loader
      className="spinner"
      color={color}
      loading={videoIsLoading}
      cssOverride={{
        position: "fixed",
        zIndex: 800000,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        margin: "auto",
        borderColor: "red",
      }}
      size={size}
    />
  );
};
export default ClockLoader
