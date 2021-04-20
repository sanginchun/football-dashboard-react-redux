import React from "react";
import PropTypes from "prop-types";
import { Table } from "semantic-ui-react";
import { useSelector } from "react-redux";

import { selectTeamIdByTeamName } from "../teams/teamsSlice";
import TeamDetail from "./TeamDetail";
import { formatTeamName } from "../../others/helper";

const propTypes = {
  match: PropTypes.object.isRequired,
  team: PropTypes.object.isRequired,
  code: PropTypes.bool,
};
const defaultProps = { code: false };

const style = { teamDetail: { justifyContent: "center" } };

function Opponent({ match, team, code }) {
  const {
    home_team: { name: homeTeamName },
    away_team: { name: awayTeamName },
  } = match;

  const homeTeamId = useSelector((state) =>
    selectTeamIdByTeamName(state, formatTeamName(homeTeamName))
  );
  const awayTeamId = useSelector((state) =>
    selectTeamIdByTeamName(state, formatTeamName(awayTeamName))
  );

  const isHome = team.team_id === homeTeamId;
  const opponentId = isHome ? awayTeamId : homeTeamId;

  return (
    <Table.Cell>
      <TeamDetail teamId={opponentId} code={code} style={style.teamDetail} />
    </Table.Cell>
  );
}

Opponent.propTypes = propTypes;
Opponent.defaultProps = defaultProps;

export default Opponent;
