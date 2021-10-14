import React, { useState, useContext } from "react";
import styled from "styled-components";
import OptionContext from "../context/OptionContext";
const FortytwoContainer = styled.div``;
const FortyItem = styled.div``;
const Create42 = ({ dnd }) => {
  const { state } = useContext(OptionContext);
  const { rows, cols, gap, backgroundcolor, containerpadding } = state;
  const { handleDragOver, handleDragLeave, handleDrop, handleDragEnter } = dnd;

  return (
    <FortytwoContainer
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
                <FortyItem className="grid-item" bg={backgroundcolor}>
                  <div
                    class="inner"
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
      ))}
    </FortytwoContainer>
  );
};

export default React.memo(Create42);
