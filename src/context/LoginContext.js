import React, { createContext, useState } from "react";

const LoginContext = createContext({
  user: { name: "", id: "" },
  menuToggle: true,
  setUser: () => {},
  setMenuToggle: () => {},
  openModal: () => {},
  closeModal: () => {},
});

export default LoginContext;
