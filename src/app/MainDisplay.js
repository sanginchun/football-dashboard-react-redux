import React from "react";
// import PropTypes from "prop-types";
import { SIDEBAR_WIDTH } from "../config";

const style = {
  position: "absolute",
  left: `${SIDEBAR_WIDTH}px`,
  minHeight: "100vh",
  width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
  padding: "1rem 4% 3rem",
};

const MainDisplay = (props) => {
  return <main style={style}>{props.children}</main>;
};

export default MainDisplay;
