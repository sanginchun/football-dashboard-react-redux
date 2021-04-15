import React from "react";
import PropTypes from "prop-types";
import { Table } from "semantic-ui-react";
import { useSelector } from "react-redux";

import { selectTeamIdByTeamName } from "./teamsSlice";
import { formatTeamName } from "../../helper";

const style = {
  Won: { backgroundColor: "lightcyan" },
  Lost: { backgroundColor: "rgba(255, 240, 240)" },
  Draw: { backgroundColor: "whitesmoke" },
  score: { fontSize: "110%", marginTop: "5px" },
};

const propTypes = {
  match: PropTypes.object.isRequired,
  team: PropTypes.object.isRequired,
};

function TeamFormScore({ match, team }) {
  const {
    home_team: { name: homeTeamName },
  } = match;

  const homeTeamId = useSelector((state) =>
    selectTeamIdByTeamName(state, formatTeamName(homeTeamName))
  );
  const isHome = team.team_id === homeTeamId;

  let result;
  if (isHome) {
    if (match.stats.home_score > match.stats.away_score) result = "Won";
    else if (match.stats.home_score < match.stats.away_score) result = "Lost";
    else result = "Draw";
  }
  // away
  else {
    if (match.stats.home_score < match.stats.away_score) result = "Won";
    else if (match.stats.home_score > match.stats.away_score) result = "Lost";
    else result = "Draw";
  }

  return (
    <Table.Cell key={match.match_id} style={style[result]}>
      {result}
      <div style={style.score}>
        {isHome
          ? `${match.stats.home_score} - ${match.stats.away_score}`
          : `${match.stats.away_score} - ${match.stats.home_score}`}
      </div>
    </Table.Cell>
  );
}

TeamFormScore.propTypes = propTypes;

export default TeamFormScore;
