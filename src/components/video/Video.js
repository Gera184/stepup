import React from "react";
import background from "./assets/background.mp4";

export const Video = () => {
  return (
    <>
      <video
        autoPlay
        loop
        muted
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: "-9999",
        }}
      >
        <source src={background} type="video/mp4" />
      </video>
      <div
        className="container text-center pt-2"
        style={{
          color: "whitesmoke",
          textShadow: "1px 0px 2px whitesmoke",
        }}
      >
        <div className="row">
          <div className="col">
            <h3>Search your favorite artists.</h3>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h2>Watch your favorite clips.</h2>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h1>Step Up</h1>
          </div>
        </div>
      </div>
    </>
  );
};
