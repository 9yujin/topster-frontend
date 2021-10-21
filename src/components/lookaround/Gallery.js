import React, { useState } from "react";
import axios from "axios";
import Feed from "./Feed";
import styled from "styled-components";

const Gallery = ({ Logout }) => {
  const [feeds, setFeeds] = useState([]);

  const loadFeed = async () => {
    setFeeds([]);
    try {
      const response = await axios({
        method: "GET",
        url: `http://localhost:5000/api/feed?search=all`,
      });
      const results = response.data.feedData;
      results.map((result) => {
        const topsterImage = result.topsterImage;
        const userid = result.userid;
        const like = result.like;
        const date = result.date;
        if (topsterImage) {
          setFeeds((prev) => [
            ...prev,
            {
              image: topsterImage,
              userid: userid,
              like: like,
              date: date,
            },
          ]);
        }
      });
      console.log(feeds);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="inner-container">
        <button onClick={Logout}>Logout</button>
        <button onClick={loadFeed}>loadfeed</button>
        <Feed feeds={feeds} />
      </div>
    </div>
  );
};

export default Gallery;
