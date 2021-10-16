import React, { useState, useContext } from "react";
import styled from "styled-components";
import OptionContext from "../../context/OptionContext";
import InnerItem from "./InnerItem";

const GridContainer = styled.div`
  grid-template-rows: repeat((${(props) => props.rows}), 1fr);
  width: calc(100vw - 30px - (2 * ${(props) => props.containerpadding}px));
  height: calc(
    (100vw - 30px - 2 * ${(props) => props.containerpadding}px) / (${(props) => props.cols}) *
      (${(props) => props.rows})
  );
  background-color: ${(props) => props.backgroundcolor};
  display: grid;
  /*  grid-gap: ${(props) => props.gap}px; */
  padding: ${(props) => props.containerpadding}px;
  @media (min-width: 619px) {
    width: calc(589px - 2 * ${(props) => props.containerpadding}px);
    height: calc(
      (589px - 2 * ${(props) => props.containerpadding}px) / (${(props) => props.cols}) *
        (${(props) => props.rows})
    );
  }
`;

const CreateGrid = ({ dnd }) => {
  const { rows, cols, gap, backgroundcolor, containerpadding } = useContext(OptionContext);

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
          className={i + "th row"}
          style={{
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            display: `grid`,
            /* gridGap: `${gap}px`, */
          }}
        >
          {[...Array(cols)].map((n, index) => {
            return (
              <InnerItem
                i={i}
                gap={gap}
                dnd={dnd}
                backgroundcolor={backgroundcolor}
                index={index}
              />
            );
          })}
        </div>
      ))}
    </GridContainer>
  );
};

export default React.memo(CreateGrid);
