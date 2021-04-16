import React from "react";
import { useSelector } from "react-redux";

import { SIDEBAR_WIDTH } from "../config";

const style = {
  root: {
    display: "flex",
    position: "fixed",
    flexDirection: "column",
    alignItems: "center",
    padding: "2rem 1rem",
    minWidth: `${SIDEBAR_WIDTH}px`,
    height: "100vh",
    zIndex: "10",
    borderRight: "1px solid whitesmoke",
  },
  editMode: {
    opacity: "0.5",
    pointerEvents: "none",
  },
};

const Sidebar = (props) => {
  const isEditMode = useSelector((state) => state.customs.editMode);

  const rootStyle = isEditMode
    ? { ...style.root, ...style.editMode }
    : { ...style.root };

  return <aside style={rootStyle}>{props.children}</aside>;
};

export default Sidebar;
