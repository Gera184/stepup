import React, { useEffect, useState, useRef } from "react";
import ReactPlayer from "react-player";
import axios from "axios";

export const Player = ({ API_PATH }) => {
  const [player, setPlayer] = useState();

  const options = {
    method: "GET",
    url: `https://genius.p.rapidapi.com/${API_PATH}`,
    headers: {
      "x-rapidapi-key": "9da9f853dcmsh86bba916aa656c2p18fc8djsne2562db22529",
      "x-rapidapi-host": "genius.p.rapidapi.com",
    },
  };

  useEffect(() => {
    axios
      .request(options)
      .then(function (response) {
        setPlayer(response.data.response.song.media);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [API_PATH]);

  if (player) {
    for (let index = 0; index < player.length; index++) {
      if (player[index].provider === "youtube") {
        var element = player[index].url;
      }
    }
  }

  return (
    <div>
      <ReactPlayer
        width="100%"
        height="100%"
        className="player"
        url={element}
      />
    </div>
  );
};
