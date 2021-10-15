import React, { useState, useContext } from "react";
import styled from "styled-components";
import OptionContext from "../context/OptionContext";
import InnerItem from "./InnerItem";

const FortytwoContainer = styled.div`
  grid-template-rows: 6fr 6fr 5fr 5fr 3fr 3fr;
  width: calc(100vw - 30px - (2 * ${(props) => props.containerpadding}px));
  height: calc((100vw - 30px - (2 * ${(props) => props.containerpadding}px)) * 14 / 15);
  margin: 0 auto;
  background-color: ${(props) => props.backgroundcolor};
  display: grid;
  margin-top: 15px;
  padding: ${(props) => props.containerpadding}px;
  @media (min-width: 619px) {
    width: calc(589px - 2 * ${(props) => props.containerpadding}px);
    height: calc((589px - 2 * ${(props) => props.containerpadding}px) * 14 / 15);
  }
`;

const FortyItem = styled.div`
  background-color: ${(props) => (props.bg === "#ffffff" ? "lightgray" : "white")};
`;

const Create42 = ({ dnd }) => {
  const { gap, backgroundcolor, containerpadding } = useContext(OptionContext);
  const arr = [5, 5, 6, 6, 10, 10];

  return (
    <FortytwoContainer
      className="42-container"
      gap={gap}
      backgroundcolor={backgroundcolor}
      containerpadding={containerpadding}
    >
      {arr.map((col, i) => {
        return (
          <>
            <div
              key={i + "row"}
              className="row"
              style={{
                gridTemplateColumns: `repeat(${col}, 1fr)`,
                display: `grid`,
              }}
            >
              {[...Array(col)].map((n, index) => {
                return (
                  <InnerItem gap={gap} dnd={dnd} backgroundcolor={backgroundcolor} index={index} />
                );
              })}
            </div>
          </>
        );
      })}

      {/* {[...Array(rows)].map((row, i) => (
        <div
          key={i}
          className="row"
          style={{
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            display: `grid`,
            gridGap: `${gap}px`,
          }}
        >
          {[...Array(cols)].map((n, index) => {
            {
              return (
                <FortyItem key={index} className="grid-item" bg={backgroundcolor}>
                  <div
                    className="inner"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                  ></div>
                </FortyItem>
              );
            }
          })}
        </div>
      ))} */}
    </FortytwoContainer>
  );
};

export default React.memo(Create42);
