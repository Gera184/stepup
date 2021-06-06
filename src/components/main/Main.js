import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import spotifyIcon from "./assets/spotify.png";
import "./Main.css";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { Player } from "../player/Player";
import { List } from "../song-list/List";
import { Video } from "../video/Video";

export default function Main() {
  const [songs, setSongs] = useState([]);
  const [dropdown, setDropdown] = useState();
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  const options = {
    method: "GET",
    url: "https://genius.p.rapidapi.com/search",
    params: { q: query },
    headers: {
      "x-rapidapi-key": "9da9f853dcmsh86bba916aa656c2p18fc8djsne2562db22529",
      "x-rapidapi-host": "genius.p.rapidapi.com",
    },
  };

  const hundleOnSubmit = (e) => {
    e.preventDefault();
    axios
      .request(options)
      .then(function (response) {
        setSongs(response.data.response.hits);
      })
      .catch(function (error) {
        console.error(error);
      });
    setQuery("");
    setLoading(true);
  };

  const hundleOnAlertLike = () => {
    alert(songs[0]?.result.primary_artist.name + " is the best!");
  };

  const hundleOnAlertDisLike = () => {
    alert(songs[0]?.result.primary_artist.name + " is not good at all");
  };

  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-1">
        <a class="navbar-brand">
          <img
            style={{ width: "40px", height: "40px" }}
            src={spotifyIcon}
            alt=""
          />
        </a>

        <div class="navbar-collapse" id="navbarTogglerDemo01">
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0"></ul>
          <form onSubmit={hundleOnSubmit} class="form-inline my-2 my-lg-0">
            <input
              class="form-control mr-sm-2"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              placeholder="Artist name"
            />
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
              Enter
            </button>
          </form>
        </div>
      </nav>

      {!loading ? <Video /> : null}

      {loading ? (
        <>
          <div className="container  text-center align-self-center">
            <div className="row ">
              <div className="col artist-title mb-3">
                <h1>
                  {songs[0] ? songs[0]?.result.primary_artist.name : null}{" "}
                </h1>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <img
                  src={
                    songs[0] ? songs[0]?.result.primary_artist.image_url : null
                  }
                  alt="..."
                  width="180"
                  class="mb-2 img-thumbnail rounded-circle"
                />
              </div>
            </div>
          </div>

          <div className="row mb-2">
            <div className="col text-right">
              <button
                onClick={hundleOnAlertLike}
                class="btn btn-outline-success"
              >
                <AiOutlineLike style={{ width: "30px", height: "30px" }} />
              </button>
            </div>
            <div className="col">
              <button
                onClick={hundleOnAlertDisLike}
                class="btn btn-outline-danger"
              >
                <AiOutlineDislike style={{ width: "30px", height: "30px" }} />
              </button>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col text-center">
              <List
                API_PATH={songs}
                ID={songs[0] ? songs[0]?.result.primary_artist.id : null}
              />
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="col" style={{ borderBottom: "1px solid white" }}>
                <h3>Top {songs[0]?.result.primary_artist.name} songs </h3>
              </div>
              <div
                className="col text-right"
                style={{ borderBottom: "1px solid white" }}
              >
                <button
                  onClick={() => {
                    setDropdown(null);
                  }}
                >
                  Close top songs
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}

      <div>
        <div class="row">
          <div
            className="col text-center align-self-center"
            style={{ fontSize: "20px" }}
          >
            {loading ? (
              <select
                value={dropdown}
                onChange={(e) => {
                  setDropdown(e.target.value);
                }}
              >
                {songs.map((song, index) => (
                  <option key={song.result.id} value={index}>
                    {song.result.full_title}
                  </option>
                ))}
              </select>
            ) : null}
          </div>
        </div>
      </div>
      {loading ? (
        <div className="container pt-3">
          <div class="row">
            <div className="col">
              <h2 className="player-title" style={{ color: "#ffff64" }}>
                {songs[dropdown]
                  ? songs[dropdown]?.result.title_with_featured
                  : null}
              </h2>
            </div>
          </div>

          {dropdown ? (
            <div className="row">
              <div className="col-sm-4 player-image-title">
                <img
                  alt="..."
                  width="250"
                  class="mb-2 img-thumbnail"
                  src={
                    songs[dropdown]
                      ? songs[dropdown]?.result.song_art_image_url
                      : null
                  }
                />
              </div>
              <div className="col">
                {dropdown ? (
                  <Player
                    API_PATH={
                      songs[dropdown] ? songs[dropdown]?.result.api_path : null
                    }
                  />
                ) : null}
                {console.log(songs[dropdown])}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
