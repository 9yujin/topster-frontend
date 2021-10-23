import React, { useState, useEffect } from "react";
import axios from "axios";
import Feed from "./Feed";

const timeForToday = (value) => {
  const today = new Date();
  const timeValue = new Date(value);

  const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60) + 540;

  //if (betweenTime < 1) return "방금전";
  if (betweenTime < 60) {
    return `${betweenTime}분 전`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간 전`;
  }

  return `${timeValue.getMonth() + 1}월 ${timeValue.getDate()}일`;
};

const Gallery = () => {
  const [feeds, setFeeds] = useState([]);

  useEffect(async () => {
    //setFeeds([]);
    try {
      const response = await axios({
        method: "GET",
        //url: `http://9yujin.shop:5000/api/feed?search=all`,
        url: `http://localhost:5000/api/feed?search=all`,
      });
      const results = response.data.feedData;
      results.map((result) => {
        const topsterImage = result.topsterImage;
        const userid = result.userid;
        const like = result.like;
        const date = result.date;
        const dateee = timeForToday(date);
        if (topsterImage) {
          setFeeds((prev) => [
            ...prev,
            {
              image: topsterImage,
              userid: userid,
              like: like,
              date: dateee,
            },
          ]);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return <Feed feeds={feeds} />;
};

export default Gallery;
