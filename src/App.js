import "./App.css";
import GetAlbums from "./components/GetAlbums";
import React, { useState, useRef, useCallback, useEffect, useContext } from "react";
import * as dnd from "./components/Dnd";
import Create42 from "./components/Create42";
import CreateGrid from "./components/CreateGrid";
import OptionContext from "./context/OptionContext";
import Option from "./components/Option";
import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";

function App() {
  const context = useContext(OptionContext);

  const [rows, setRows] = useState(5);
  const [cols, setCols] = useState(5);
  const [gap, setGap] = useState(2);
  const [containerpadding, setContainerPadding] = useState(25);
  const [fortytwo, setFortytwo] = useState(false);
  const [backgroundcolor, setBackgroundColor] = useState("#000000");

  const [optiontoggle, setOptionToggle] = useState(true);
  const canvas = useRef(null);

  const onSave = useCallback(() => {
    if (canvas.current === null) {
      return;
    }
    toPng(canvas.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-topster.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [canvas]);

  return (
    <div>
      <header id="header">
        <div className="container">
          <div className="inner-container">
            <h1 className="header-title">Topster</h1>
            <input className="header-menu" type="button" value="save image" onClick={onSave} />
          </div>
        </div>
      </header>

      <main id="main">
        <OptionContext.Provider
          value={{
            rows,
            setRows,
            cols,
            setCols,
            gap,
            setGap,
            containerpadding,
            setContainerPadding,
            fortytwo,
            setFortytwo,
            backgroundcolor,
            setBackgroundColor,
          }}
        >
          <div className="grid-wrapper" ref={canvas}>
            {fortytwo === true ? <Create42 dnd={dnd} /> : <CreateGrid dnd={dnd} />}
          </div>

          <div className="container">
            <div className="inner-container">
              <button
                style={{ margin: "15px", textAlign: "center" }}
                onClick={() => {
                  setOptionToggle((prev) => !prev);
                }}
              >
                {optiontoggle
                  ? "Select options & Move on to the next step"
                  : "Reset topster & Back to options"}
              </button>
              {optiontoggle ? <Option /> : <GetAlbums handleDragStart={dnd.handleDragStart} />}
            </div>
          </div>
        </OptionContext.Provider>
      </main>
    </div>
  );
}

export default App;
