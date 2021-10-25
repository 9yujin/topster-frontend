import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Feed from "./Feed";
import LoginContext from "../../context/LoginContext";
import LoginForm from "./LoginForm";

const timeForToday = (value) => {
  const today = new Date();
  const timeValue = new Date(value);

  const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60) + 540;

  if (betweenTime < 1) return "방금 전";
  if (betweenTime < 60) {
    return `${betweenTime}분 전`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간 전`;
  }

  return `${timeValue.getMonth() + 1}월 ${timeValue.getDate()}일`;
};

const Gallery = ({ error, setError, menu }) => {
  const context = useContext(LoginContext);
  const [feeds, setFeeds] = useState([]);
  const [likestate, setLikeState] = useState();
  const getPost = async () => {
    try {
      const userid = context.user.id;
      const response = await axios({
        method: "GET",
        //url: `http://9yujin.shop:5000/api/feed?search=${context.user.id}`,
        url: `http://localhost:5000/api/feed?user=${userid}&search=all`,
      });
      const results = response.data.feedData;
      results.map((result, index) => {
        const topsterImage = result.topsterImage;
        const userid = result.userid;
        const like = result.like;
        const postid = result._id;
        const date = result.date;
        const dateee = timeForToday(date);
        const likebool = result.likebool;
        const indexid = index;
        if (topsterImage) {
          setFeeds((prev) => [
            ...prev,
            {
              image: topsterImage,
              userid: userid,
              like: like,
              date: dateee,
              postid: postid,
              liketoggle: likebool,
              indexid: indexid,
            },
          ]);
        }
      });

      console.log("렌더링");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (context.user.id != "") {
      getPost();
    }
  }, [context.user.id]);

  useEffect(() => {
    setLikeState();
  }, [feeds]);

  return <Feed feeds={feeds} setFeeds={setFeeds} />;
};

export default Gallery;
