import React, { useState, useContext } from "react";
import styled from "styled-components";
import OptionContext from "../context/OptionContext";

const CreateGrid = ({ dnd }) => {
  const { state } = useContext(OptionContext);
  const { rows, cols, gap, backgroundcolor, containerpadding } = state;
  /*   const [rows, setRows] = useState(8);
  const [cols, setCols] = useState(8);
  const [gap, setGap] = useState(3);
  const [backgroundcolor, setBackgroundColor] = useState("#000000");
  const [containerpadding, setContainerPadding] = useState(10); */

  const { handleDragOver, handleDragLeave, handleDrop, handleDragEnter } = dnd;

  const GridContainer = styled.div`
    grid-template-rows: repeat(${rows}, 1fr);
    width: calc(100vw - 30px - 2 * ${containerpadding}px);
    height: calc((100vw - 30px - 2 * ${containerpadding}px) / ${cols} * ${rows});
    margin: 0 auto;
    background-color: ${backgroundcolor};
    display: grid;
    margin-top: 15px;
    grid-gap: ${gap}px;
    padding: ${containerpadding}px;
    border: ${(props) => (props.bg === "#ffffff" ? "1px" : "0px")} solid gray;
    @media (min-width: 650px) {
      width: calc(620px - 2 * ${containerpadding}px);
      height: calc((620px - 2 * ${containerpadding}px) / ${cols} * ${rows});
    }
  `;

  const GridItem = styled.div`
    background-color: ${(props) => (props.bg === "#ffffff" ? "lightgray" : "white")};
  `;

  return (
    <GridContainer className="grid-container" bg={backgroundcolor}>
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
