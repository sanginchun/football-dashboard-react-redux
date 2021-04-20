import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Placeholder, Table } from "semantic-ui-react";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchMatches,
  selectMatchesUpcomingByTeam,
} from "../features/matches/matchesSlice";
import { selectTeamById } from "../features/teams/teamsSlice";

import Opponent from "../features/teams/Opponent";
import { formatDate } from "../others/helper";

const propTypes = {
  leagueId: PropTypes.number.isRequired,
  teamId: PropTypes.number.isRequired,
};

const style = {
  root: { height: "300px", overflowY: "auto" },
  tableHeaderCell: { position: "sticky", top: "0" },
  venue: { fontSize: "90%" },
};

const config = {
  placeholderLines: 12,
  tableHeader: ["Schedule", "Opponent"],
};

function TeamSchedule({ leagueId, teamId }) {
  const dispatch = useDispatch();
  const currentTeam = useSelector((state) => selectTeamById(state, teamId));
  const matches = useSelector((state) =>
    selectMatchesUpcomingByTeam(state, currentTeam?.name)
  );
  const leagueMatchesUpdated = useSelector(
    (state) => state.matches.updated[leagueId]
  );

  useEffect(() => {
    if (!leagueMatchesUpdated) {
      dispatch(fetchMatches(leagueId));
    }
  }, [dispatch, leagueMatchesUpdated, leagueId]);

  if (!matches.length || !currentTeam) {
    return (
      <Placeholder fluid={true}>
        {Array.from({ length: config.placeholderLines }, (_, i) => (
          <Placeholder.Line key={i} />
        ))}
      </Placeholder>
    );
  }

  const renderedHeader = config.tableHeader.map((text, i) => (
    <Table.HeaderCell key={i} style={style.tableHeaderCell}>
      {text}
    </Table.HeaderCell>
  ));

  const renderedBody = matches.map((match) => (
    <Table.Row key={match.match_id}>
      <Table.Cell width={11}>
        {formatDate(match.match_start_iso)}
        <br />
        <small
          children={`@ ${match.venue?.name || "TBD"}`}
          style={style.venue}
        />
      </Table.Cell>
      <Opponent match={match} team={currentTeam} code={true} />
    </Table.Row>
  ));

  return (
    <div style={style.root}>
      <Table celled={true} size="small" textAlign="center">
        <Table.Header>
          <Table.Row>{renderedHeader}</Table.Row>
        </Table.Header>
        <Table.Body>{renderedBody}</Table.Body>
      </Table>
    </div>
  );
}

TeamSchedule.propTypes = propTypes;

export default TeamSchedule;
