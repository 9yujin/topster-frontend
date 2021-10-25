import React, { useContext, useState } from "react";
import { EllipsisHorizontal } from "react-ionicons";
import LoginContext from "../../context/LoginContext";
import axios from "axios";

const Feed = ({ feeds, mypost }) => {
  const context = useContext(LoginContext);

  const onLike = async (e) => {
    const postid = e.currentTarget.getAttribute("postid");
    const index = e.currentTarget.getAttribute("feedindex");
    const liketoggle = e.currentTarget.getAttribute("initliketoggle");
    console.log(liketoggle); //0(좋아요 안한 상태) -> 좋아요 누르기 1 -> 좋아요 취소 [서버에서]
    const response = await axios({
      method: "post",
      //url: `http://9yujin.shop:5000/api/like`,
      url: `http://localhost:5000/api/like`,
      data: { postid: postid, like: liketoggle, userid: context.user.id },
    });
    if (response.data.msg === "succeeded") {
      console.log(typeof liketoggle); //짝수: 좋아요 안한 상태, 홀수: 좋아요 한 상태
    }
  };

  return (
    <>
      {feeds.map((feed, index) => (
        <div className="feeditem" key={feed.postid}>
          <img
            alt="img"
            src={feed.image}
            style={{ width: "100%", borderRadius: "15px 15px 0px 0px" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", padding: "20px" }}>
            <div>
              <div style={{ fontSize: "16px", fontWeight: "500" }}>{feed.userid}</div>
              <div style={{ fontSize: "14px", color: "#666666" }}>
                {feed.date} · 좋아요 {feed.like}개
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
              <div
                className="feedButton"
                postid={feed.postid}
                feedindex={index}
                initliketoggle={feed.liketoggle}
                style={{
                  fontSize: "26px",
                  marginRight: "5px",
                  position: "relative",
                  top: "-1px",
                }}
                onClick={onLike}
              >
                ♡
              </div>
              {/* {feed.liketoggle ? (
                <div
                  postid={feed.postid}
                  feedindex={index}
                  liketoggleinit={feed.liketoggle}
                  style={{
                    fontSize: "26px",
                    marginRight: "5px",
                    position: "relative",
                    top: "-1px",
                    color: "#ed4956",
                  }}
                  onClick={onLike}
                >
                  ♥
                </div>
              ) : (
                <div
                  className="feedButton"
                  postid={feed.postid}
                  feedindex={index}
                  liketoggleinit={feed.liketoggle}
                  style={{
                    fontSize: "26px",
                    marginRight: "5px",
                    position: "relative",
                    top: "-1px",
                  }}
                  onClick={onLike}
                >
                  ♡
                </div>
              )} */}
              {mypost && (
                <div onClick={context.openModal} postid={feed.postid} style={{ marginLeft: "8px" }}>
                  <EllipsisHorizontal cssClasses="feedButton" height="25px" width="25px" />
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Feed;
