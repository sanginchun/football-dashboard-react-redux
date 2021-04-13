import React from "react";
import PropTypes from "prop-types";

const propTypes = { headerText: PropTypes.string.isRequired };

const style = {
  root: {
    padding: "1.5rem 0",
    borderBottom: "1px solid whitesmoke",
    marginBottom: "2rem",
  },
};

function PageHeader({ headerText }) {
  return (
    <div style={style.root}>
      <h1>{headerText}</h1>
    </div>
  );
}

PageHeader.propTypes = propTypes;

export default PageHeader;
