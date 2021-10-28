import React, { useContext, useState, useEffect } from "react";
import OptionContext from "../../context/OptionContext";
import ReactTooltip from "react-tooltip";
const Option = ({ onSave, onUpload }) => {
  const context = useContext(OptionContext);
  const colors = ["#BBB1D6", "#ef798a", "#718f94", "#ffffff", "black"];
  const [pickcolor, setPickColor] = useState(context.backgroundcolor);
  const [rowvalue, setRowValue] = useState(context.rows);
  const [colvalue, setColValue] = useState(context.cols);
  const [gapvalue, setGapValue] = useState(context.gap);
  const [paddingvalue, setPaddingValue] = useState(context.containerpadding);

  const onPickColor = (e) => {
    setPickColor(e.target.value);
  };
  useEffect(() => {
    context.setBackgroundColor(pickcolor);
  }, [pickcolor]);

  const onChangeRow = (e) => {
    setRowValue(e.target.value);
  };
  useEffect(() => {
    if (parseInt(rowvalue) >= 0) {
      context.setRows(parseInt(rowvalue));
    }
  }, [rowvalue]);

  const onChangeCol = (e) => {
    setColValue(e.target.value);
  };
  useEffect(() => {
    if (parseInt(colvalue) >= 0) {
      context.setCols(parseInt(colvalue));
    }
  }, [colvalue]);

  const onChangeGap = (e) => {
    setGapValue(e.target.value);
  };
  useEffect(() => {
    context.setGap(gapvalue);
  }, [gapvalue]);

  const onChangePadding = (e) => {
    setPaddingValue(e.target.value);
  };
  useEffect(() => {
    context.setContainerPadding(parseInt(paddingvalue));
  }, [paddingvalue]);

  const set42 = () => {
    console.log(context.fortytwo);
    context.setFortytwo((prev) => !prev);
  };

  const setDefault = () => {
    context.setBackgroundColor("#000000");
    setPickColor("#000000");
    context.setGap(2);
    setGapValue(2);
    context.setContainerPadding(25);
    setPaddingValue(25);
  };

  return (
    <div
      style={{ margin: "5px 15px", display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        {colors.map((color) => (
          <div
            className="pallete"
            key={color}
            style={{
              background: color,
              width: "24px",
              height: "24px",
              cursor: "pointer",
              borderRadius: "50%",
              margin: "0px 5px",
            }}
            onClick={() => context.setBackgroundColor(color)}
          />
        ))}
        <input
          type="color"
          className="pallete-picker"
          value={pickcolor}
          onChange={onPickColor}
          style={{ margin: "0px 5px" }}
        />
      </div>

      <div style={{ margin: "10px", display: "flex" }}>
        <div className="size-button">
          <span style={{ fontSize: "13px" }}> 가로: </span>
          <input
            disabled={context.fortytwo}
            type="number"
            min="0"
            max="10"
            inputMode="numeric"
            pattern="[0-9]*"
            value={colvalue}
            onChange={onChangeCol}
            style={{ width: "30px", height: "20px", border: "none", fontSize: "13px" }}
          />
        </div>
        <div className="size-button">
          <span style={{ fontSize: "13px" }}> 세로: </span>
          <input
            disabled={context.fortytwo}
            type="number"
            min="0"
            max="10"
            inputMode="numeric"
            pattern="[0-9]*"
            value={rowvalue}
            onChange={onChangeRow}
            style={{ width: "30px", height: "20px", border: "none", fontSize: "13px" }}
          />
        </div>
      </div>

      <div style={{ display: "flex" }}>
        <div className="size-button">
          <span style={{ fontSize: "13px", width: "40px" }}> 간격:</span>
          <input
            type="range"
            min="0"
            max="5"
            step="0.1"
            value={gapvalue}
            onChange={onChangeGap}
            style={{ width: "86px" }}
          />
        </div>
        <div className="size-button">
          <span style={{ fontSize: "13px", width: "40px" }}> 테두리:</span>
          <input
            type="range"
            min="0"
            max="50"
            step="0.1"
            value={paddingvalue}
            onChange={onChangePadding}
            style={{ width: "86px" }}
          />
        </div>
      </div>

      <div style={{ margin: "5px" }}>
        <span data-tip data-for="handleGrid">
          <input
            type="button"
            value={context.fortytwo ? "그리드" : "Top42"}
            onClick={set42}
            className="option-button"
          />
        </span>
        <ReactTooltip id="handleGrid" type="light" effect="solid">
          <span>탑스터에 넣은 앨범아트가 초기화됩니다</span>
        </ReactTooltip>
        <input type="button" className="option-button" value="설정 초기화" onClick={setDefault} />
        <input type="button" className="option-button" value="이미지 저장" onClick={onSave} />
        <input type="button" className="option-button" value="업로드" onClick={onUpload} />
      </div>

      <div></div>
    </div>
  );
};

export default React.memo(Option);
