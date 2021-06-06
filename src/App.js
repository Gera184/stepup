import React from "react";
import Main from "./components/main/Main";
import { Video } from "./components/video/Video";

export default () => {
  return (
    <>
      <div
        style={{
          fontFamily: "Sofia sans-serif",
          backgroundColor: "black",
          color: "whitesmoke",
          overflowX: "hidden",
        }}
      >
        <Main />
      </div>
    </>
  );
};
