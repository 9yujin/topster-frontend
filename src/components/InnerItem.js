import React from "react";
import styled from "styled-components";

const FortyItem = styled.div`
  background-color: ${(props) => (props.backgroundcolor === "#ffffff" ? "lightgray" : "white")};
  margin: ${(props) => props.gap}px;
`;

const InnerItem = ({ gap, dnd, backgroundcolor, index }) => {
  const { handleDragOver, handleDragLeave, handleDrop, handleDragEnter } = dnd;

  return (
    <FortyItem key={index} className="grid-item" backgroundcolor={backgroundcolor} gap={gap}>
      <div
        className="inner"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
      ></div>
    </FortyItem>
  );
};

export default InnerItem;
