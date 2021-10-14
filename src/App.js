import "./App.css";
import GetAlbums from "./components/GetAlbums";
import Option from "./components/Option";
import Create42 from "./components/Create42";
import CreateGrid from "./components/CreateGrid";
import React, { useState, useContext, useRef, useCallback } from "react";
import * as dnd from "./components/Dnd";
import { OptionProvider } from "./context/OptionContext";
import OptionContext from "./context/OptionContext";
import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";

function App() {
  const { actions, state } = useContext(OptionContext);
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
    <>
      <header id="header">
        <div className="container">
          <div className="inner-container">
            <h1 className="header-title">Topster</h1>
            <input className="header-menu" type="button" value="save image" onClick={onSave} />
          </div>
        </div>
      </header>

      <main id="main">
        <OptionProvider>
          <div class="grid-wrapper" ref={canvas}>
            {state.fortytwo ? <Create42 /> : <CreateGrid dnd={dnd} />}
          </div>
          <div class="container">
            <div class="inner-container">
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
        </OptionProvider>
      </main>
    </>
  );
}

export default App;
