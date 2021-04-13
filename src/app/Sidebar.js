import React from "react";
// import PropTypes from "prop-types";
import { SIDEBAR_WIDTH } from "../config";

const style = {
  display: "flex",
  position: "fixed",
  flexDirection: "column",
  alignItems: "center",
  padding: "2rem 1rem",
  minWidth: `${SIDEBAR_WIDTH}px`,
  height: "100vh",
  zIndex: "10",
  borderRight: "1px solid whitesmoke",
};

const Sidebar = (props) => {
  return <aside style={style}>{props.children}</aside>;
};

export default Sidebar;
