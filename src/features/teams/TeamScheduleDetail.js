import React from "react";
import PropTypes from "prop-types";
import { Table } from "semantic-ui-react";

import { useSelector } from "react-redux";

import { selectTeamIdByTeamName } from "../teams/teamsSlice";
import TeamDetail from "../teams/TeamDetail";
import { formatTeamName, formatDate } from "../../helper";

const style = {
  teamDetail: { justifyContent: "center" },
  venue: { fontSize: "90%" },
};

const propTypes = {
  match: PropTypes.object.isRequired,
  team: PropTypes.object.isRequired,
};

function TeamScheduleDetail({ match, team }) {
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
    <React.Fragment>
      <Table.Cell width={11}>
        {formatDate(match.match_start_iso)}
        <br />
        <small
          children={`@ ${match.venue?.name || "TBD"} (${
            isHome ? "Home" : "Away"
          })`}
          style={style.venue}
        />
      </Table.Cell>
      <Table.Cell width={5}>
        <TeamDetail teamId={opponentId} code={true} style={style.teamDetail} />
      </Table.Cell>
    </React.Fragment>
  );
}

TeamScheduleDetail.propTypes = propTypes;

export default TeamScheduleDetail;
