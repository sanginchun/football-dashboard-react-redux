import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Flag } from "semantic-ui-react";

import { selectLeagueById } from "./leaguesSlice";

const propTypes = {
  leagueId: PropTypes.number.isRequired,
  header: PropTypes.bool,
};

const defaultProps = { header: false };

const style = {
  leagueName: { display: "inline-block", marginLeft: "0.5rem", color: "#333" },
  header: { fontWeight: "600", fontSize: "1.6rem", marginLeft: "0.8rem" },
};

function LeagueDetail({ leagueId, header }) {
  const league = useSelector((state) => selectLeagueById(state, leagueId));

  return (
    <Link to={`/league/${leagueId}`}>
      <Flag name={league.countryName.toLowerCase()} />
      <div
        style={
          header ? { ...style.leagueName, ...style.header } : style.leagueName
        }
      >
        {league.name}
      </div>
    </Link>
  );
}

LeagueDetail.propTypes = propTypes;
LeagueDetail.defaultProps = defaultProps;

export default LeagueDetail;
