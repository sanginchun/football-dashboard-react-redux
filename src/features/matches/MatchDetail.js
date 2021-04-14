import React from "react";
import PropTypes from "prop-types";
import { Table } from "semantic-ui-react";

import { useSelector } from "react-redux";

import { selectTeamIdByTeamName } from "../teams/teamsSlice";
import TeamDetail from "../teams/TeamDetail";
import { formatTeamName } from "../../helper";

const style = {
  teamDetail: { justifyContent: "center" },
  info: { fontSize: "110%" },
  winner: { backgroundColor: "lightcyan" },
};

const propTypes = {
  match: PropTypes.object.isRequired,
  subType: PropTypes.string.isRequired,
};

function MatchDetail({ match, subType }) {
  const {
    home_team: { name: homeTeamName },
    away_team: { name: awayTeamName },
    stats: { home_score: homeScore, away_score: awayScore },
  } = match;

  const homeTeamId = useSelector((state) =>
    selectTeamIdByTeamName(state, formatTeamName(homeTeamName))
  );
  const awayTeamId = useSelector((state) =>
    selectTeamIdByTeamName(state, formatTeamName(awayTeamName))
  );

  let winner = null;
  if (subType === "result") {
    if (homeScore > awayScore) winner = "home";
    else if (homeScore === awayScore) winner = "draw";
    else winner = "away";
  }

  const renderedMidCell =
    subType === "result" ? (
      <Table.Cell
        style={
          winner === "draw" ? { ...style.info, ...style.winner } : style.info
        }
      >
        {homeScore} - {awayScore}
      </Table.Cell>
    ) : (
      <Table.Cell style={style.info}>
        {match.match_start_local.split(" ")[1]}
      </Table.Cell>
    );

  return (
    <React.Fragment>
      <Table.Cell style={winner === "home" ? style.winner : null}>
        <TeamDetail teamId={homeTeamId} code={true} style={style.teamDetail} />
      </Table.Cell>
      {renderedMidCell}
      <Table.Cell style={winner === "away" ? style.winner : null}>
        <TeamDetail teamId={awayTeamId} code={true} style={style.teamDetail} />
      </Table.Cell>
    </React.Fragment>
  );
}

MatchDetail.propTypes = propTypes;

export default MatchDetail;
