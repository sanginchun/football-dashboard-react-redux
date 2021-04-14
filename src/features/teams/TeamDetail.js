import React from "react";
import { Placeholder } from "semantic-ui-react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectTeamById } from "./teamsSlice";

const propTypes = {
  teamId: PropTypes.number.isRequired,
  code: PropTypes.bool,
  style: PropTypes.object,
};

const defaultProps = { code: false, style: {} };

const style = {
  root: { display: "flex", alignItems: "center" },
  link: { color: "#333" },
  teamName: { marginTop: "0" },
  teamLogo: { width: "1.3rem", marginRight: "1rem" },
};

function TeamDetail({ teamId, code, style: addStyle }) {
  const team = useSelector((state) => selectTeamById(state, teamId));
  if (!team) {
    return (
      <Placeholder>
        <Placeholder.Line length="long" />
        <Placeholder.Line length="full" />
      </Placeholder>
    );
  }

  return (
    <Link to={`/league/${team.league_id}/${team.team_id}`} style={style.link}>
      <div style={{ ...style.root, ...addStyle }}>
        <img
          style={style.teamLogo}
          src={team.logo}
          alt={`Logo of ${team.short_code}`}
          title={team.name}
        />
        <div style={style.teamName}>{code ? team.short_code : team.name}</div>
      </div>
    </Link>
  );
}

TeamDetail.propTypes = propTypes;
TeamDetail.defaultProps = defaultProps;

export default TeamDetail;
