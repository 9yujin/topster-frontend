import React, { useState, useContext } from "react";
import Gallery from "./Gallery";
import MyPost from "./MyPost";
import LoginContext from "../../context/LoginContext";

const MainPage = () => {
  const [error, setError] = useState("");
  const context = useContext(LoginContext);

  return (
    <>
      <div className="container">
        <div className="inner-container" id="gallery">
          {context.menuToggle ? <Gallery /> : <MyPost error={error} setError={setError} />}
        </div>
      </div>
    </>
  );
};

export default MainPage;
