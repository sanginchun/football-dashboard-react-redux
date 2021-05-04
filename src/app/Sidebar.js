import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { Button } from "semantic-ui-react";

import { SIDEBAR_WIDTH } from "../others/config";

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
    backgroundColor: "#fff",
    transition: `all 0.4s ease-in-out`,
  },
  mobile: {
    minWidth: `200px`,
    padding: "2rem 0",
  },
  editMode: {
    opacity: "0.5",
    pointerEvents: "none",
  },
  drawer: {
    transform: `translateX(-${SIDEBAR_WIDTH}px)`,
  },
  buttonVisible: {
    position: "fixed",
    top: "2rem",
    right: "1.5%",
    zIndex: 99,
  },
  buttonNone: {
    display: "none",
  },
};

const Sidebar = (props) => {
  const isMedium = useMediaQuery("(max-width: 1200px)");
  const isExSmall = useMediaQuery("(max-width: 600px)");
  const [open, setOpen] = useState(!isMedium);
  const isEditMode = useSelector((state) => state.customs.editMode);

  let rootStyle = style.root;

  if (isEditMode) rootStyle = { ...rootStyle, ...style.editMode };
  if (!open) rootStyle = { ...rootStyle, ...style.drawer };
  if (isExSmall) rootStyle = { ...rootStyle, ...style.mobile };

  useEffect(() => {
    if (isMedium) setOpen(false);
    else setOpen(true);
  }, [isMedium]);

  useEffect(() => {
    const handleOuterClick = (e) => {
      if (!e.target.closest("aside") && !e.target.closest("button.btn-toggle"))
        setOpen(false);
    };

    if (open && isMedium) {
      window.addEventListener("click", handleOuterClick);
    }

    return () => window.removeEventListener("click", handleOuterClick);
  }, [open, isMedium]);

  return (
    <>
      <Button
        circular
        className="btn-toggle"
        size="large"
        style={isMedium ? style.buttonVisible : style.buttonNone}
        icon="bars"
        onClick={() => setOpen(!open)}
      />
      <aside style={rootStyle}>{props.children}</aside>
    </>
  );
};

export default Sidebar;
