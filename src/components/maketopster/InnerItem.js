import React from "react";
import styled from "styled-components";

const Item = styled.div`
  background-color: ${(props) => (props.backgroundcolor === "#ffffff" ? "lightgray" : "white")};
  margin: ${(props) => props.gap}px;
`;

const InnerItem = ({ i, gap, dnd, backgroundcolor, index }) => {
  const { handleDragOver, handleDragLeave, handleDrop, handleDragEnter } = dnd;

  return (
    <Item key={i + "-" + index} id={i + "-" + index} className="inner-item" gap={gap}>
      <div
        className="inner"
        backgroundcolor={backgroundcolor}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
      ></div>
    </Item>
  );
};

export default InnerItem;
