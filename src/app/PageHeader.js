import React from "react";

const style = {
  root: {
    padding: "1.5rem 0",
    borderBottom: "1px solid whitesmoke",
    marginBottom: "2rem",
    position: "relative",
  },
};

function PageHeader(props) {
  return <div style={style.root}>{props.children}</div>;
}

export default PageHeader;
