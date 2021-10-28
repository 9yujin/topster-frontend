import React, { useContext, useState, useEffect } from "react";
import { EllipsisHorizontal } from "react-ionicons";
import LoginContext from "../../context/LoginContext";
import axios from "axios";

const Feed = ({ feeds, setFeeds, mypost, nonlogin }) => {
  const context = useContext(LoginContext);
  const [feedsref, setFeedsRef] = useState();

  useEffect(() => {
    setFeedsRef(feeds);
  }, [feeds]);

  const onLike = async (e) => {
    if (nonlogin === true || context.user.id == "") {
      window.alert("로그인 후에 이용해 주시기 바랍니다");
      return;
    } else {
      const node = e.currentTarget;
      const postid = node.getAttribute("postid");
      const stateindex = node.getAttribute("feedindex");
      const liketoggle = feedsref[stateindex].liketoggle;
      const response = await axios({
        method: "post",
        url: `http://9yujin.shop:5000/api/like`,
        //url: `http://localhost:5000/api/like`,
        data: { postid: postid, like: liketoggle, userid: context.user.id },
      });
      if (response.data.msg === "succeeded") {
        let newArr = [...feedsref];
        console.log(newArr[stateindex].liketoggle);

        if (liketoggle === 0) {
          newArr[stateindex].liketoggle = 1;
          newArr[stateindex].like += 1;
          setFeedsRef(newArr);
          //setFeedsRef([...feedsref, (feedsref[index].like += 1)]);
        } else if (liketoggle === 1) {
          newArr[stateindex].liketoggle = 0;
          newArr[stateindex].like -= 1;
          setFeedsRef(newArr);
        }
        //setFeedsRef([...feedsref, (feedsref[index].liketoggle += 1)]);
      }
    }
  };

  return (
    <>
      {feedsref &&
        feedsref.map((feedref, index) => (
          <div className="feeditem" key={feedref.postid}>
            <img
              alt="img"
              src={feedref.image}
              style={{ width: "100%", borderRadius: "15px 15px 0px 0px" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", padding: "20px" }}>
              <div>
                <div style={{ fontSize: "16px", fontWeight: "500" }}>{feedref.userid}</div>
                <div style={{ fontSize: "14px", color: "#666666" }}>
                  {feedref.date} · 좋아요 {feedref.like}개
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                {/* <div
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
              </div> */}
                {feedref.liketoggle ? (
                  <div
                    postid={feedref.postid}
                    feedindex={index}
                    initliketoggle={feedref.liketoggle}
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
                    postid={feedref.postid}
                    feedindex={index}
                    initliketoggle={feedref.liketoggle}
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
                )}
                {mypost && (
                  <div
                    onClick={context.openModal}
                    postid={feedref.postid}
                    style={{ marginLeft: "8px" }}
                  >
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

export default React.memo(Feed);
