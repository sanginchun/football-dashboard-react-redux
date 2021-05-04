import React from "react";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { SIDEBAR_WIDTH } from "../others/config";

const style = {
  root: {
    position: "absolute",
    left: `${SIDEBAR_WIDTH}px`,
    minHeight: "100vh",
    width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
    padding: "1rem 4% 3rem",
  },

  medium: {
    left: "0",
    width: "100vw",
  },
};

const MainDisplay = (props) => {
  const isMedium = useMediaQuery("(max-width: 1200px)");

  let rootStyle = style.root;
  if (isMedium) rootStyle = { ...rootStyle, ...style.medium };

  return <main style={rootStyle}>{props.children}</main>;
};

export default MainDisplay;
