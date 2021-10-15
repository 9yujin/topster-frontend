import React, { createContext, useState } from "react";

const OptionContext = createContext({
  rows: 5,
  cols: 5,
  gap: 3.0,
  backgroundcolor: "black",
  containerpadding: 25,
  fortytwo: false,

  setRows: () => {},
  setCols: () => {},
  setGap: () => {},
  setBackgroundColor: () => {},
  setContainerPadding: () => {},
  setFortytwo: () => {},
});

// const OptionProvider = ({ value, children }) => {
//   const [rows, setRows] = useState(5);
//   const [cols, setCols] = useState(5);
//   const [gap, setGap] = useState(3);
//   const [backgroundcolor, setBackgroundColor] = useState("#000000");
//   const [containerpadding, setContainerPadding] = useState(25);
//   const [fortytwo, setFortytwo] = useState(false);

//   const value = {
//     state: { rows, cols, gap, backgroundcolor, containerpadding, fortytwo },
//     actions: { setRows, setCols, setGap, setBackgroundColor, setContainerPadding, setFortytwo },
//   };

//   return <OptionContext.Provider value={{ actions, state }}>{children}</OptionContext.Provider>;
// };

export default OptionContext;
// export { OptionProvider };
