import React from "react";
import { Dropdown } from "semantic-ui-react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectTeamById } from "./teamsSlice";

const propTypes = {
  teamId: PropTypes.number.isRequired,
};

const style = {
  root: { display: "flex", alignItems: "center" },
  link: { color: "#333" },
  teamName: { marginTop: "0" },
  teamLogo: { width: "1.3rem", marginRight: "1rem" },
};

function TeamDetail({ teamId }) {
  const team = useSelector((state) => selectTeamById(state, teamId));

  return (
    <Dropdown.Item
      as={Link}
      to={`/league/${team.league_id}/${team.team_id}`}
      style={style.link}
    >
      <div style={style.root}>
        <img
          style={style.teamLogo}
          src={team.logo}
          alt={`Logo of ${team.code}`}
          title={team.name}
        />
        <div style={style.teamName}>{team.name}</div>
      </div>
    </Dropdown.Item>
  );
}

TeamDetail.propTypes = propTypes;

export default TeamDetail;
