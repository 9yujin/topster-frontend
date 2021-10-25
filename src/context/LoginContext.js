import React, { createContext, useState } from "react";

const LoginContext = createContext({
  user: { name: "", id: "" },
  menuToggle: true,
  delPostID: "",
  delsucceeded: false,
  setUser: () => {},
  setMenuToggle: () => {},
  openModal: () => {},
  closeModal: () => {},
  setDelPostID: () => {},
  setDelSucceeded: () => {},
});

export default LoginContext;
