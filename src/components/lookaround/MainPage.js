import React, { useState, useContext, useEffect } from "react";
import Gallery from "./Gallery";
import MyPost from "./MyPost";
import LoginContext from "../../context/LoginContext";
import Cookies from "universal-cookie/es6";

const MainPage = () => {
  const [error, setError] = useState("");
  const context = useContext(LoginContext);
  const cookies = new Cookies();

  useEffect(() => {
    console.log("바뀜");
    cookies.set("menutoggle", context.menuToggle, { path: "/" });
  }, [context.menuToggle]);

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
