import React, { useState, useContext } from "react";
import styled from "styled-components";
import OptionContext from "../context/OptionContext";

const GridContainer = styled.div`
  grid-template-rows: repeat((${(props) => props.rows}), 1fr);
  width: calc(100vw - 30px - (2 * ${(props) => props.containerpadding}px));
  height: calc(
    (100vw - 30px - 2 * ${(props) => props.containerpadding}px) / (${(props) => props.cols}) *
      (${(props) => props.rows})
  );
  margin: 0 auto;
  background-color: ${(props) => props.backgroundcolor};
  display: grid;
  margin-top: 15px;
  grid-gap: ${(props) => props.gap}px;
  padding: ${(props) => props.containerpadding}px;
  /* border: ${(props) =>
    props.backgroundcolor !== "#ffffff" ? "0px" : props.containerpadding === 0 ? "0px" : "1px"}
    solid gray; */
  @media (min-width: 650px) {
    width: calc(620px - 2 * ${(props) => props.containerpadding}px);
    height: calc(
      (620px - 2 * ${(props) => props.containerpadding}px) / (${(props) => props.cols}) *
        (${(props) => props.rows})
    );
  }
`;

const GridItem = styled.div`
  background-color: ${(props) => (props.bg === "#ffffff" ? "lightgray" : "white")};
`;

const CreateGrid = ({ dnd }) => {
  const { state } = useContext(OptionContext);
  const { rows, cols, gap, backgroundcolor, containerpadding } = state;
  const { handleDragOver, handleDragLeave, handleDrop, handleDragEnter } = dnd;

  /*   const GridContainer = styled.div`
    grid-template-rows: repeat(${rows}, 1fr);
    width: calc(100vw - 30px - 2 * ${containerpadding}px);
    height: calc((100vw - 30px - 2 * ${containerpadding}px) / ${cols} * ${rows});
    margin: 0 auto;
    background-color: ${backgroundcolor};
    display: grid;
    margin-top: 15px;
    grid-gap: ${gap}px;
    padding: ${containerpadding}px;
    border: ${(props) => (props.bg !== "#ffffff" ? "0px" : containerpadding === 0 ? "0px" : "1px")}
      solid gray;
    @media (min-width: 650px) {
      width: calc(620px - 2 * ${containerpadding}px);
      height: calc((620px - 2 * ${containerpadding}px) / ${cols} * ${rows});
    }
  `;
  //얘를 밖으로 빼내야 create42랑 번갈아 보여줄수있는데,,, 저 state들 때문에 밖으로 못빼누,,,

  const GridItem = styled.div`
    background-color: ${(props) => (props.backgroundcolor === "#ffffff" ? "lightgray" : "white")};
  `; */

  return (
    <GridContainer
      className="grid-container"
      rows={rows}
      cols={cols}
      gap={gap}
      backgroundcolor={backgroundcolor}
      containerpadding={containerpadding}
    >
      {[...Array(rows)].map((row, i) => (
        <div
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
                <GridItem className="grid-item" bg={backgroundcolor}>
                  <div
                    class="inner"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                  ></div>
                </GridItem>
              );
            }
          })}
        </div>
      ))}
    </GridContainer>
  );
};

export default React.memo(CreateGrid);
