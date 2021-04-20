import React from "react";
import PropTypes from "prop-types";

const style = {
  root: {
    width: "10rem",
    color: "#333",
    border: "1px solid #ddd",
    borderRadius: "3px",
    padding: "3px 6px",
    marginBottom: "1rem",
  },
};

const propTypes = {
  dateArr: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};

function DatePicker({ dateArr, onChange }) {
  return (
    <select style={style.root} onChange={(e) => onChange(e.target.value)}>
      {dateArr.map((date) => (
        <option key={date} value={date}>
          {date}
        </option>
      ))}
    </select>
  );
}

DatePicker.propTypes = propTypes;

export default DatePicker;
