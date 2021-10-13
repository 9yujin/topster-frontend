import React, { createContext, useState } from "react";

const OptionContext = createContext({
  state: {
    rows: 10,
    cols: 10,
    gap: 3,
    backgroundcolor: "black",
    containerpadding: 10,
  },
  actions: {
    setRows: () => {},
    setCols: () => {},
    setGap: () => {},
    setBackgroundColor: () => {},
    setContainerPadding: () => {},
  },
});

const OptionProvider = ({ children }) => {
  const [rows, setRows] = useState(10);
  const [cols, setCols] = useState(10);
  const [gap, setGap] = useState(3);
  const [backgroundcolor, setBackgroundColor] = useState("#000000");
  const [containerpadding, setContainerPadding] = useState(10);

  const value = {
    state: { rows, cols, gap, backgroundcolor, containerpadding },
    actions: { setRows, setCols, setGap, setBackgroundColor, setContainerPadding },
  };

  return <OptionContext.Provider value={value}>{children}</OptionContext.Provider>;
};

export default OptionContext;
export { OptionProvider };
