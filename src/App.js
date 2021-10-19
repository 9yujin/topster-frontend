import "./App.css";
import React, { useState, useContext } from "react";
import { Route, Switch, Link } from "react-router-dom";
import CreateTopster from "./components/maketopster/CreateTopster";
import styled from "styled-components";
import { MenuOutline } from "react-ionicons";
import MainPage from "./components/lookaround/MainPage";
import LoginContext from "./context/LoginContext";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;

  &:hover {
    color: gray;
  }
`;

const App = () => {
  const [user, setUser] = useState({ name: "", id: "" });

  return (
    <div>
      <LoginContext.Provider value={{ user, setUser }}>
        <header id="header">
          <div className="container">
            <div className="inner-container">
              <StyledLink to="/">
                <h1 className="header-title">Topster</h1>
              </StyledLink>
              <StyledLink to="/lookaround">
                <MenuOutline color={"#00000"} title="menu" height="22px" width="22px" />
              </StyledLink>
            </div>
          </div>
        </header>

        <Switch>
          <Route path="/" exact component={CreateTopster} />
          <Route path="/lookaround" component={MainPage} />
        </Switch>
      </LoginContext.Provider>
    </div>
  );
};

export default App;
