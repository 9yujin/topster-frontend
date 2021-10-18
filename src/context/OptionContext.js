import React, { createContext, useState } from "react";

const OptionContext = createContext({
  rows: 5,
  cols: 5,
  gap: parseFloat(3.0),
  backgroundcolor: "#000000",
  containerpadding: 25,
  fortytwo: true,
  clicked1: null,
  clicked2: null,

  setRows: () => {},
  setCols: () => {},
  setGap: () => {},
  setBackgroundColor: () => {},
  setContainerPadding: () => {},
  setFortytwo: () => {},
  setClicked1: () => {},
  setClicked2: () => {},
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
