import React, { useState } from "react";
import ColorContext from "./ColorContext";
import { getRandomColor } from "../../utils/colors";

export default function ColorState(props) {
  // Color used in home sceen start btn and window border
  const [primaryColor, setPrimaryColor] = useState(getRandomColor());

  // Color userd in Navbar text
  const [secondaryColor, setSecondaryColor] = useState(() => {
    let randomColor = getRandomColor();
    while (randomColor === primaryColor) randomColor = getRandomColor();
    return randomColor
  });

  return (
    <ColorContext.Provider value={{ primaryColor, secondaryColor }}>
      {props.children}
    </ColorContext.Provider>
  );
}
