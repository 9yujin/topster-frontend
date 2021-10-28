import React, { createContext, useState } from "react";

const LoginContext = createContext({
  user: { name: null, id: null },
  menuToggle: true,
  delPostID: "",
  delsucceeded: false,
  feedroading: true,
  nonlogin: false,
  setUser: () => {},
  setMenuToggle: () => {},
  openModal: () => {},
  closeModal: () => {},
  setDelPostID: () => {},
  setDelSucceeded: () => {},
  setFeedRoading: () => {},
  setNonLogin: () => {},
});

export default LoginContext;
