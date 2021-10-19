import React, { createContext, useState } from "react";

const LoginContext = createContext({
  user: { name: "", id: "" },
  setUser: () => {},
});

export default LoginContext;
