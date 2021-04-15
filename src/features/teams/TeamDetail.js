import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectTeamById } from "./teamsSlice";

const propTypes = {
  teamId: PropTypes.number.isRequired,
  code: PropTypes.bool,
  style: PropTypes.object,
};

const defaultProps = { code: false, header: false, style: {} };

const style = {
  root: { display: "flex", alignItems: "center" },
  link: { color: "#333" },
  teamName: { marginTop: "0" },
  teamLogo: { width: "1.3rem", marginRight: "1rem" },
  header: { fontWeight: "600", fontSize: "1.6rem" },
  headerLogo: { width: "2rem", marginRight: "1.5rem" },
};

function TeamDetail({ teamId, code, header, style: addStyle }) {
  const team = useSelector((state) => selectTeamById(state, teamId));

  return (
    <Link to={`/league/${team.league_id}/${team.team_id}`} style={style.link}>
      <div style={{ ...style.root, ...addStyle }}>
        <img
          style={header ? style.headerLogo : style.teamLogo}
          src={team.logo}
          alt={`Logo of ${team.short_code}`}
          title={team.name}
        />
        <div
          style={
            header ? { ...style.teamName, ...style.header } : style.teamName
          }
        >
          {code ? team.short_code : team.name}
        </div>
      </div>
    </Link>
  );
}

TeamDetail.propTypes = propTypes;
TeamDetail.defaultProps = defaultProps;

export default TeamDetail;
