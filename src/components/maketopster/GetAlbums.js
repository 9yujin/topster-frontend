import React, { useState, useEffect, useContext, useCallback, useRef } from "react";
import axios from "axios";
import OptionContext from "../../context/OptionContext";

const GetAlbums = ({ handleDragStart }) => {
  const { clicked1, clicked2, setClicked1, setClicked2 } = useContext(OptionContext);
  const [value, setValue] = useState("");
  const [arts, setArts] = useState([]);

  const onChange = useCallback(
    (e) => {
      setValue(e.target.value);
    },
    [value]
  );

  const getData = async () => {
    try {
      const response = await axios({
        method: "GET",
        /* url: `http://9yujin.shop/api/albums?search=${value}`, */
        url: `http://localhost:5000/api/albums?search=${value}`,
      });
      const results = response.data.res.albums;
      results.map((result) => {
        const albumImage = result.image;
        const albumTitle = result.title;
        const albumArtist = result.artist;
        const albumID = result.id;
        if (albumImage) {
          setArts((prev) => [
            ...prev,
            {
              image: albumImage,
              name: `${albumArtist} - ${albumTitle}`,
              spID: albumID,
              title: albumTitle,
            },
          ]);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  let clickedNode = null;

  const onSubmit = (e) => {
    setArts([]);
    e.preventDefault();
    console.log(value, "submit");
    getData(value);
  };

  return (
    <div className="getAlbum">
      <form className="search" onSubmit={onSubmit}>
        <input placeholder="앨범 이름" value={value} onChange={onChange} />
        <button type="submit">검색</button>
      </form>
      <div className="searchResult">
        {arts.map((art, i) => (
          <div
            className="art"
            key={art.name}
            /* onClick={(e) => {
              if (clickedNode != null) {
                clickedNode.classList.remove("clicked");
              }
              clickedNode = e.target;
              if (e.target === clickedNode) {
                clickedNode.classList.remove("clicked");
              }
            }} */
          >
            <div
              draggable
              className="inner"
              id={art.name}
              onDragStart={(e) => {
                handleDragStart(e, { art });
              }}
              style={{
                backgroundImage: `url(${art.image})`,
                backgroundSize: "cover",
                height: "70px",
                width: "70px",
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(GetAlbums);
