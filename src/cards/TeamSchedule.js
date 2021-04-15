import React from "react";
import { Placeholder, Table } from "semantic-ui-react";

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectMatchesUpcomingByTeam } from "../features/matches/matchesSlice";
import { selectTeamById } from "../features/teams/teamsSlice";

import Opponent from "../features/teams/Opponent";
import { formatDate } from "../helper";

const style = {
  root: { height: "300px", overflowY: "auto" },
  tableHeaderCell: { position: "sticky", top: "0" },
  venue: { fontSize: "90%" },
};

const config = {
  placeholderLines: 12,
  tableHeader: ["Schedule", "Opponent"],
};

function TeamSchedule() {
  const { teamId } = useParams();
  const currentTeam = useSelector((state) => selectTeamById(state, teamId));
  const matches = useSelector((state) =>
    selectMatchesUpcomingByTeam(state, currentTeam?.name)
  );

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

export default TeamSchedule;
