import React, { useState, useEffect, useContext, useRef, useCallback } from "react";
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
  const [offset, setOffset] = useState(0);
  const [isloading, setIsLoading] = useState(true);

  /*  const options = {
    root: null, //기본 null, 관찰대상의 부모요소를 지정
    rootMargin: "0px", // 관찰하는 뷰포트의 마진 지정
    threshold: 1.0, // 관찰요소와 얼만큼 겹쳤을 때 콜백을 수행하도록 지정하는 요소
  };
  const observer = new IntersectionObserver((entires, observer) => {
    entires.forEach((entry) => {
      console.log(entry);
    });
  }, options);

  observer.observe(observeRef.current); */

  const getPost = async () => {
    let userid;

    try {
      if (context.nonlogin) {
        userid = "non-login-user";
      } else {
        userid = context.user.id;
      }

      const response = await axios({
        method: "GET",
        url: `http://9yujin.shop:5000/api/feed?user=${userid}&search=all&offset=${offset}&limit=5`,
        //url: `http://localhost:5000/api/feed?user=${userid}&search=all&offset=${offset}&limit=5`,
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
      //더 불러오기
      if (results.length === 5) {
        setOffset((prev) => prev + 5);
      } else {
        setOffset(false);
      }
      setIsLoading(false);
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
    if (context.nonlogin === true) getPost();
  }, [context.nonlogin]);

  return (
    <>
      {feeds.length == "" ? (
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
        <>
          <Feed feeds={feeds} setFeeds={setFeeds} nonlogin={context.nonlogin} />
          {offset ? (
            <div onClick={getPost} className="more">
              더 불러오기
            </div>
          ) : (
            <div className="feedend">마지막 피드입니다.</div>
          )}
        </>
      )}

      {/* <div ref={observeRef} style={{ height: "100px" }}>
        옵저버
      </div> */}
    </>
  );
};

export default React.memo(Gallery);
