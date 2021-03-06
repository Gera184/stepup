import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

export const List = ({ ID, API_PATH }) => {
  const [songs, setSongs] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [value, setValue] = useState();
  const [isToggled, setToggled] = useState(false);

  const options = {
    method: "GET",
    url: `https://genius.p.rapidapi.com/artists/${ID}/songs`,
    params: { page: page },
    headers: {
      "x-rapidapi-key": "9da9f853dcmsh86bba916aa656c2p18fc8djsne2562db22529",
      "x-rapidapi-host": "genius.p.rapidapi.com",
    },
  };
console.log(API_PATH[value])
  useEffect(() => {
    axios
      .request(options)
      .then(function (response) {
        
        setSongs(response.data.response.songs);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [ID, page]);

  const nextPage = () => {
    setPage(page + 1);
  };

  const PreviousPage = () => {
    setPage(page - 1);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const sortZtoA = () => {
    const sorted = songs.sort((a, b) => (b.title > a.title ? 1 : -1));
    setSongs(sorted);
    setToggled(!isToggled);
  };
  const sortAtoZ = () => {
    const sorted = songs.sort((a, b) => (a.title > b.title ? 1 : -1));
    setSongs(sorted);
    setToggled(!isToggled);
  };

  const filteredQuery = songs.filter((song) =>
    song.title.toLowerCase().includes(search.toLocaleLowerCase())
  );

  return (
    <>
      <div className="container">
        <div
          className="row text-center"
          style={{ borderBottom: "1px solid white" }}
        >
          <div className="col p-2">
            <input
              placeholder="Search song"
              onChange={handleChange}
              style={{ borderRadius: "10px", textAlign: "center" }}
            />
          </div>
        </div>
        <div class="row">
          <div className="col text-center pt-3 pb-2">
            <button
              class="btn btn-outline-danger btn-lg"
              onClick={PreviousPage}
            >
              Previous
            </button>

            {isToggled ? (
              <button class="btn btn-outline-warning btn-lg" onClick={sortAtoZ}>
                order A-Z
              </button>
            ) : null}
            {!isToggled ? (
              <button class="btn btn-outline-warning btn-lg" onClick={sortZtoA}>
                order Z-A
              </button>
            ) : null}

            <button class="btn btn-outline-success btn-lg" onClick={nextPage}>
              Next
            </button>
          </div>
        </div>
      </div>
      {ID ? (
        <div className="container-fluid">
          <div className="row">
            {filteredQuery.map((song, index) => (
              <>
                <div key={song.id} className="col-sm-3">
                  <img
                    alt="..."
                    width="250"
                    class="mb-2 img-thumbnail "
                    src={song ? song?.song_art_image_url : null}
                    onClick={() => setValue(index)}
                  />
                  <p style={{ color: "#ffff64" }}>
                    {song ? song?.title : null}
                  </p>
                </div>
              </>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};
