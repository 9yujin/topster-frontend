import React, { useContext } from "react";
import { HeartOutline, EllipsisHorizontal } from "react-ionicons";
import LoginContext from "../../context/LoginContext";

const Feed = ({ feeds, mypost }) => {
  const context = useContext(LoginContext);
  return (
    <>
      {feeds.map((feed) => {
        return (
          <div className="feeditem">
            <img src={feed.image} style={{ width: "100%", borderRadius: "15px 15px 0px 0px" }} />
            <div style={{ display: "flex", justifyContent: "space-between", padding: "20px" }}>
              <div>
                <div style={{ fontSize: "16px", fontWeight: "500" }}>{feed.userid}</div>
                <div style={{ fontSize: "14px", color: "#666666" }}>
                  {feed.date} · 좋아요 {feed.like}개
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    fontSize: "23px",
                    marginRight: "5px",
                    position: "relative",
                    top: "-1px",
                  }}
                >
                  ♡
                </div>

                {mypost == "true" && (
                  <>
                    <EllipsisHorizontal
                      color={"#00000"}
                      title="menu"
                      height="25px"
                      width="25px"
                      onClick={context.openModal}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Feed;
