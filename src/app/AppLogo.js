import React from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "../hooks/useMediaQuery";

const style = {
  logo: {
    display: "flex",
    width: "min-content",
    alignItems: "center",
  },
  emoji: {
    display: "inline-block",
    margin: "0 1rem 0 0",
    fontSize: "2.5rem",
  },
  text: {
    display: "inline-block",
    margin: 0,
  },
};

function AppLogo() {
  const isExSmall = useMediaQuery("(max-width: 600px)");

  return (
    <Link to="/" style={{ color: "inherit" }}>
      <div style={style.logo}>
        <h1 style={style.emoji}>⚽</h1>
        {isExSmall ? null : (
          <h2 style={style.text}>
            Football
            <br />
            Dashboard
          </h2>
        )}
      </div>
    </Link>
  );
}

export default AppLogo;
