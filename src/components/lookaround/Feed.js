import React from "react";
import styled from "styled-components";

const StyledFeed = styled.div``;

const Feed = ({ feeds }) => {
  return (
    <StyledFeed>
      {feeds.map((feed) => {
        return (
          <div className="feeditem">
            <img src={feed.image} style={{ width: "100%" }} />
            <div>{feed.userid}</div>
            <div>{feed.date}</div>
            <div>like: {feed.like}</div>
          </div>
        );
      })}
    </StyledFeed>
  );
};

export default Feed;
