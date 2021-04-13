import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Dropdown, Flag } from "semantic-ui-react";

import { selectLeagueById } from "./leaguesSlice";

const propTypes = {
  leagueId: PropTypes.number.isRequired,
};

const style = {
  leagueName: { display: "inline-block", marginLeft: "0.5rem" },
};

function LeagueDetail({ leagueId }) {
  const league = useSelector((state) => selectLeagueById(state, leagueId));

  return (
    <Dropdown.Item as={Link} to={`/league/${leagueId}`}>
      <Flag name={league.countryName.toLowerCase()} />
      <div style={style.leagueName}>{league.name}</div>
    </Dropdown.Item>
  );
}

LeagueDetail.propTypes = propTypes;

export default LeagueDetail;
