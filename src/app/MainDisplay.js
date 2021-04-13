import React from "react";
// import PropTypes from "prop-types";
import { SIDEBAR_WIDTH } from "../config";

const style = {
  position: "absolute",
  left: `${SIDEBAR_WIDTH}px`,
  width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
  padding: "1rem 5rem 3rem",
};

const MainDisplay = () => {
  return (
    <main style={style}>
      <div>MainDisplay</div>
    </main>
  );
};

export default MainDisplay;
