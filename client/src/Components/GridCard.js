export default function GridCard({
  title,
  image,
  stretchedA,
  stretchedB,
  episodeNum,
}) {
  return (
    <div
      className="gridcard-wrapper"
      style={{
        marginTop: "30px",
        display: "flex",

        gap: "10px",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
     
      }}
    >
      <div
        style={{
          borderRadius: "10px",
          backgroundImage: `url(${image})`,
          height: "480px",
          width: "320px",


          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      ></div>

      {episodeNum > 0 && (
        <h5 style={{ color: "white", fontWeight: "lighter" }}>
          Episode {episodeNum}
        </h5>
      )}

      <h4 className="grid-card-title" style={{ textAlign:"center",color: "white", fontWeight: "lighter" }}>{title}</h4>
    </div>
  );
}
