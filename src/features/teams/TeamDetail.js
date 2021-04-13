import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Dropdown } from "semantic-ui-react";

const propTypes = {
  team: PropTypes.object.isRequired,
};

const style = {
  root: { display: "flex", alignItems: "center" },
  teamName: { marginTop: "0" },
  teamLogo: { width: "1.3rem", marginRight: "1rem" },
};

function TeamDetail({ team }) {
  return (
    <Dropdown.Item as={Link} to={`/league/${team.league_id}/${team.team_id}`}>
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
