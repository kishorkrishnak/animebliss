import ShakaPlayer from "shaka-player-react";
import "shaka-player-react/dist/controls.css";
import Select from 'react-select';
import  { useState } from 'react';
export default function AnimePlay({ url }) {
    const [selectedOption, setSelectedOption] = useState(null);
    const options = [
        { value: 1, label:1 },
        { value: 2, label:2 },
        { value: 'vanilla', label: 'Vanilla' },
      ];
  return (
    <>
      <ShakaPlayer autoPlay src={url} />

      <div
        className="curranime"
        style={{ padding: 30, backgroundColor: "#10141e" }}
      >
        <h3 style={{ color: "red" }}>Anime Title</h3>
        <div className="curranimeinfo" style={{marginTop:10, display: "flex", gap: 25 }}>
          <span style={{ color: "white" }} className="curranime-platform">
            TV Show
          </span>
          <span style={{ color: "white" }} className="curranime-score">
            Score: 85
          </span>
          <span style={{ color: "white" }} className="curranime-epaired">
            Episodes Aired: 10
          </span>
          <span style={{ color: "white" }} className="curranime-releaseyear">
            2020
          </span>
          <span style={{ color: "white" }} className="curranime-status">
            Completed
          </span>
        </div>

        <form>
       <div style={{width:80}}>

       <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
      />

       </div>
      
     
        </form>
        <p style={{ textAlign: "justify" }}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error,
          necessitatibus recusandae! Sint facilis provident aut. Ratione alias
          libero asperiores expedita aperiam consectetur saepe autem ipsam
          corrupti, dolorem temporibus harum vel reiciendis similique
          repellendus quae optio modi eaque sequi? Perspiciatis, aut animi!
          Natus tenetur id asperiores dolorum assumenda voluptate voluptas, quas
          ex amet consectetur cupiditate vitae commodi ipsum laborum iste nobis
          vel veniam fugiat corrupti? Labore cumque odit distinctio totam, error
          soluta accusantium facilis tenetur! Ipsam doloribus nesciunt est
          minus, autem suscipit unde alias nihil ab repellendus, quod veritatis!
          Laboriosam dolores, fugiat ut ratione enim quia nulla esse repellat
          sint eligendi fugit in, repudiandae quaerat quo officia ipsa expedita
          possimus sequi? Sunt id neque quas earum perspiciatis ullam
          exercitationem libero aliquam ea quo reiciendis incidunt corporis
          cupiditate, quam voluptatum consequuntur minima porro nesciunt itaque
          eaque quos recusandae inventore maxime. Dolores necessitatibus ullam,
          praesentium eos, facere illum aliquam distinctio obcaecati aspernatur
          vel saepe, id minus. Facere non, minus ex facilis repellendus quaerat
          sapiente magni ducimus deleniti nostrum, voluptatem mollitia ab dolore
          nam quod incidunt consectetur! Dolorem porro nulla fugiat delectus
          rerum, perspiciatis optio odit ex cumque ad? Ipsam, eius quaerat magni
          quos, alias culpa omnis qui odit laborum, officiis suscipit blanditiis
          natus.
        </p>
      </div>
    </>
  );
}
