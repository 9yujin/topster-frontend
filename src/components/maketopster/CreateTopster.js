import GetAlbums from "./GetAlbums";
import React, { useState, useRef, useCallback, useEffect, useContext } from "react";
import * as dnd from "./Dnd";
import Create42 from "./Create42";
import CreateGrid from "./CreateGrid";
import OptionContext from "../../context/OptionContext";
import Option from "./Option";
import { toPng, toBlob } from "html-to-image";
import { elementToSVG, inlineResources } from "dom-to-svg";
import axios from "axios";
import LoginContext from "../../context/LoginContext";

const CreateTopster = () => {
  const [rows, setRows] = useState(5);
  const [cols, setCols] = useState(5);
  const [gap, setGap] = useState(2);
  const [containerpadding, setContainerPadding] = useState(25);
  const [fortytwo, setFortytwo] = useState(true);
  const [backgroundcolor, setBackgroundColor] = useState("#000000");
  const [clicked1, setClicked1] = useState(null);
  const [clicked2, setClicked2] = useState(null);

  const [optiontoggle, setOptionToggle] = useState(true);
  const canvas = useRef(null);

  const context = useContext(LoginContext);

  const onSave = useCallback(async () => {
    var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    console.log(canvas.current.firstChild.style.width);
    if (canvas.current === null) {
      return;
    }
    toPng(canvas.current.firstChild, {
      cacheBust: true,
    })
      .then((dataUrl) => {
        //console.log(dataUrl);
        const link = document.createElement("a");
        link.download = "my-topster.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
    /* if (isSafari) {
      const svgDocument = elementToSVG(canvas.current.firstChild);
      const svgString = new XMLSerializer().serializeToString(svgDocument);
      const inlinesvg = await inlineResources(svgDocument.documentElement);
      console.log(inlinesvg);
    } else {
      toPng(canvas.current.firstChild, {
        cacheBust: true,
      })
        .then((dataUrl) => {
          //console.log(dataUrl);
          const link = document.createElement("a");
          link.download = "my-topster.png";
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.log(err);
        });
    } */
  }, [canvas]);

  const onUpload = async () => {
    if (canvas.current === null) {
      return;
    }
    const dataUrl = await toPng(canvas.current.firstChild, {
      cacheBust: true,
    });
    console.log(context.user.id);
    if (context.user.id) {
      //로그인 되어있을때
      const uploadData = { topsterimage: dataUrl };
      const response = await axios({
        method: "POST",
        url: `http://9yujin.shop:5000/api/upload?user=${context.user.id}`,
        //url: `http://localhost:5000/api/upload?user=${context.user.id}`,
        data: uploadData,
      });
      if (response.data.msg == "upload succeeded") {
        window.location.href = "/";
      }
    } else {
      alert("로그인 후 이용해주시기 바랍니다");
      return; //로그인 모달창 띄워보기
    }
  };

  return (
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
          clicked1,
          setClicked1,
          clicked2,
          setClicked2,
        }}
      >
        <div className="grid-wrapper" ref={canvas}>
          {fortytwo === true ? <Create42 dnd={dnd} /> : <CreateGrid dnd={dnd} />}
        </div>

        <div className="container">
          <div className="inner-container">
            <div className="flex-bar">
              {optiontoggle ? (
                <Option onSave={onSave} onUpload={onUpload} />
              ) : (
                <GetAlbums handleDragStart={dnd.handleDragStart} />
              )}
              <button
                onClick={() => {
                  setOptionToggle((prev) => !prev);
                }}
                className="optiontoggle-button"
              >
                {optiontoggle ? "앨범아트 찾기 >" : "< 돌아가기"}
              </button>
            </div>
          </div>
        </div>
      </OptionContext.Provider>
    </main>
  );
};

export default React.memo(CreateTopster);
