import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import { Route, Switch, Link } from "react-router-dom";
import CreateTopster from "./components/maketopster/CreateTopster";
import MainPage from "./components/lookaround/MainPage";
import LoginContext from "./context/LoginContext";
import { CreateOutline, Create, LogOutOutline } from "react-ionicons";

import axios from "axios";
import Cookies from "universal-cookie/es6";
import ModalFeed from "./components/lookaround/ModalFeed";
const cookies = new Cookies();

const App = () => {
  const [user, setUser] = useState({ name: "", id: "" });
  const [path, setPath] = useState();
  const [nonlogin, setNonLogin] = useState(false);
  const [delPostID, setDelPostID] = useState();
  const [delsucceeded, setDelSucceeded] = useState(false);
  const menuA = useRef(null);
  const menuB = useRef(null);
  const overlay = useRef();
  const this_modal = useRef();

  const [menuToggle, setMenuToggle] = useState(true);
  const [feedroading, setFeedRoading] = useState(true);

  const onMenuA = () => {
    setMenuToggle(true);
    menuA.current.id = "active";
    menuB.current.id = "";
  };

  const onMenuB = () => {
    setMenuToggle(false);
    menuA.current.id = "";
    menuB.current.id = "active";
  };

  const toggleicon = () => {
    const a = window.location.pathname;
    if (a === "/") {
      setPath(true);
    } else if (a === "/pallete") {
      setPath(false);
    }
  };

  const openModal = (e) => {
    this_modal.current.classList.remove("hidden");
    const data = e.currentTarget.getAttribute("postid");
    setDelPostID(data);
  };
  const closeModal = () => {
    this_modal.current.classList.add("hidden");
  };

  useEffect(() => {
    toggleicon();
  }, []);

  useEffect(() => {
    const func = async () => {
      const jwt_token = cookies.get("jwt");
      if (jwt_token) {
        const response = await axios({
          method: "get",
          //url: `http://localhost:5000/api/auth`,
          url: `http://9yujin.shop:5000/api/auth`,
          headers: {
            Authorization: jwt_token,
          },
        });
        const result = response.data;
        if (result) {
          setUser({
            name: result.name,
            id: result.id,
          });
        }
      } else {
        setNonLogin(true);
      }
    };
    func();
  }, []);

  const Logout = async () => {
    const ok = window.confirm("정말로 로그아웃 하시겠습니까?");
    if (ok) {
      setUser({ name: "", id: "" });

      const jwt_token = cookies.get("jwt");
      const response = await axios({
        method: "get",
        url: `http://localhost:5000/api/logout`,
        //url: `http://9yujin.shop:5000/api/logout`,
        headers: {
          Authorization: jwt_token,
        },
      });
      if (response.data.msg === "succeeded") {
        cookies.remove("jwt");
        setNonLogin(true);
      }
    }
  };

  return (
    <div>
      <LoginContext.Provider
        value={{
          user,
          setUser,
          menuToggle,
          setMenuToggle,
          openModal,
          closeModal,
          delPostID,
          setDelPostID,
          delsucceeded,
          setDelSucceeded,
          feedroading,
          setFeedRoading,
          nonlogin,
          setNonLogin,
        }}
      >
        <header id="header">
          <div className="container">
            <div className="inner-container">
              <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                <h1
                  className="header-title"
                  onClick={() => {
                    setPath(true);
                  }}
                >
                  Topster
                </h1>
              </Link>
              <div className="right">
                <Link
                  to="/pallete"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    position: "relative",
                    top: "-2px",
                  }}
                >
                  {path ? (
                    <CreateOutline
                      height="26px"
                      width="26px"
                      style={{ positon: "abosulte" }}
                      onClick={() => {
                        setPath(false);
                      }}
                    />
                  ) : (
                    <Create height="26px" width="26px" />
                  )}
                </Link>
                {user.id !== "" ? (
                  <LogOutOutline
                    height="27px"
                    width="27px"
                    style={{ marginLeft: "15px" }}
                    onClick={Logout}
                  />
                ) : (
                  <LogOutOutline
                    height="27px"
                    width="27px"
                    color={"#cccccc"}
                    style={{ marginLeft: "15px" }}
                    onClick={Logout}
                  />
                )}
              </div>
            </div>
          </div>
          {path && (
            <nav>
              <div className="container">
                <div className="inner-container" style={{ paddingBottom: "0px" }}>
                  <ul>
                    <li onClick={onMenuA} ref={menuA} className="lookaround" id="active">
                      둘러보기
                    </li>
                    <li onClick={onMenuB} ref={menuB} className="mytopter">
                      내 탑스터
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          )}
        </header>

        <Switch>
          <Route path="/pallete" exact component={CreateTopster} />
          <Route path="/" component={MainPage} />
        </Switch>

        <div class="modal hidden" ref={this_modal}>
          <div class="modal_overlay" ref={overlay} onClick={closeModal}></div>
          <div class="modal_content">
            <ModalFeed
              closeModal={closeModal}
              delPostID={delPostID}
              setDelSucceeded={setDelSucceeded}
            />
          </div>
        </div>
      </LoginContext.Provider>
    </div>
  );
};

export default App;
