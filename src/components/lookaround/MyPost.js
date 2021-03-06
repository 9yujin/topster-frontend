import React, { useContext, useEffect, useState } from "react";
import LoginContext from "../../context/LoginContext";
import LoginForm from "./LoginForm";
import axios from "axios";
import Feed from "./Feed";

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

const MyPost = ({ error, setError }) => {
  const context = useContext(LoginContext);
  const [feeds, setFeeds] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const getPost = async () => {
    try {
      const userid = context.user.id;
      const response = await axios({
        method: "GET",
        url: `http://9yujin.shop:5000/api/feed?search=${userid}&user=${userid}`,
        //url: `http://localhost:5000/api/feed?search=${userid}&user=${userid}`,
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
      setIsLoading(false);
      console.log("렌더링");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPost();
  }, [context.user.id]);

  useEffect(() => {
    if (context.delsucceeded) {
      setFeeds(feeds.filter((feed) => feed.postid != context.delPostID));
      context.setDelPostID("");
      context.setDelSucceeded(false);
    }
  }, [context.delsucceeded]);

  return (
    <>
      {context.user.id != "" ? (
        feeds.length == "" ? (
          isloading ? (
            <div>"로딩화면"</div>
          ) : (
            <>
              <div style={{ marginTop: "48px" }}>첫 탑스터를 만들어보세요</div>
              <a href="/pallete">
                <button>GO</button>
              </a>
            </>
          )
        ) : (
          <Feed feeds={feeds} mypost="true" />
        )
      ) : (
        <LoginForm error={error} setError={setError} />
      )}
    </>
  );
};

export default React.memo(MyPost);
