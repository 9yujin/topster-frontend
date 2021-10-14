import React, { useContext, useState, useEffect } from "react";
import OptionContext from "../context/OptionContext";

const Option = () => {
  const { actions, state } = useContext(OptionContext);
  const colors = ["#BBB1D6", "green", "#1e3269", "#ffffff", "black"];
  const [pickcolor, setPickColor] = useState(state.backgroundcolor);
  const [rowvalue, setRowValue] = useState(state.rows);
  const [colvalue, setColValue] = useState(state.cols);
  const [gapvalue, setGapValue] = useState(state.gap);
  const [paddingvalue, setPaddingValue] = useState(state.containerpadding);

  const onPickColor = (e) => {
    setPickColor(e.target.value);
  };
  useEffect(() => {
    actions.setBackgroundColor(pickcolor);
  }, [pickcolor]);

  const onChangeRow = (e) => {
    setRowValue(e.target.value);
  };
  useEffect(() => {
    if (parseInt(rowvalue) >= 0) {
      actions.setRows(parseInt(rowvalue));
    }
  }, [rowvalue]);

  const onChangeCol = (e) => {
    setColValue(e.target.value);
  };
  useEffect(() => {
    if (parseInt(colvalue) >= 0) {
      actions.setCols(parseInt(colvalue));
    }
  }, [colvalue]);

  const onChangeGap = (e) => {
    setGapValue(e.target.value);
  };
  useEffect(() => {
    actions.setGap(parseInt(gapvalue));
  }, [gapvalue]);

  const onChangePadding = (e) => {
    setPaddingValue(e.target.value);
  };
  useEffect(() => {
    actions.setContainerPadding(parseInt(paddingvalue));
  }, [paddingvalue]);

  const set42 = () => {
    actions.setFortytwo((prev) => !prev);
  };

  const setDefault = () => {
    actions.setBackgroundColor("#000000");
    setPickColor("#000000");
    actions.setGap(3);
    setGapValue(3);
    actions.setContainerPadding(25);
    setPaddingValue(25);
  };

  return (
    <div
      style={{ margin: "5px 15px", display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        {colors.map((color) => (
          <div
            class="pallete"
            key={color}
            style={{
              background: color,
              width: "24px",
              height: "24px",
              cursor: "pointer",
              borderRadius: "50%",
              margin: "0px 5px",
            }}
            onClick={() => actions.setBackgroundColor(color)}
          />
        ))}
        <input
          type="color"
          value={pickcolor}
          onChange={onPickColor}
          style={{ margin: "0px 5px" }}
        />
      </div>
      <div style={{ margin: "10px" }}>
        <input
          type="number"
          min="0"
          max="10"
          inputmode="numeric"
          pattern="[0-9]*"
          value={rowvalue}
          onChange={onChangeRow}
        />
        <span> x </span>
        <input
          type="number"
          min="0"
          max="10"
          inputmode="numeric"
          pattern="[0-9]*"
          value={colvalue}
          onChange={onChangeCol}
        />
      </div>
      <div>
        <input type="range" min="0" max="10" value={gapvalue} onChange={onChangeGap} />
        <input type="range" min="0" max="50" value={paddingvalue} onChange={onChangePadding} />
      </div>
      <div>
        <input type="button" value={state.fortytwo ? "set Grid" : "set 42"} onClick={set42} />
        <input type="button" value="set Default" onClick={setDefault} />
      </div>
    </div>
  );
};

export default React.memo(Option);
