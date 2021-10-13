import "./App.css";
import GetAlbums from "./components/GetAlbums";
import Option from "./components/Option";
import Create42 from "./components/Create42";
import CreateGrid from "./components/CreateGrid";
import React, { useState } from "react";
import * as dnd from "./components/Dnd";
import { OptionProvider } from "./context/OptionContext";

function App() {
  const [fortytwo, setFortytwo] = useState(false);
  const [optiontoggle, setOptionToggle] = useState(true);

  return (
    <>
      <header id="header">
        <div className="container">
          <div className="inner-container">
            <h1 class="header-title">Topster</h1>
            <div class="header-menu">=</div>
          </div>
        </div>
      </header>

      <main id="main">
        <OptionProvider>
          <div class="grid-wrapper">{fortytwo ? <Create42 /> : <CreateGrid dnd={dnd} />}</div>
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
