import React from "react";
import { Placeholder, Table } from "semantic-ui-react";

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectMatchesFinishedByTeam } from "../features/matches/matchesSlice";
import { selectTeamById } from "../features/teams/teamsSlice";

import Opponent from "../features/teams/Opponent";
import TeamFormScore from "../features/teams/TeamFormScore";

import { MAX_TEAM_FORM_MATCHES } from "../config";

const style = {
  root: { overflowY: "auto" },
  header: { backgroundColor: "#f9fafb", fontWeight: "600" },
};

const config = {
  placeholderLines: 10,
};

function TeamForm() {
  const { teamId } = useParams();
  const currentTeam = useSelector((state) => selectTeamById(state, teamId));
  const matches = useSelector((state) =>
    selectMatchesFinishedByTeam(state, currentTeam?.name)
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

  const slicedMatches =
    matches.length > MAX_TEAM_FORM_MATCHES
      ? matches.slice(matches.length - MAX_TEAM_FORM_MATCHES)
      : matches;

  const OpponentRow = [
    <Table.Cell key={0} style={style.header} width={2} children="Opponent" />,
  ];
  const DateRow = [
    <Table.Cell key={0} style={style.header} width={2} children="Date" />,
  ];
  const ScoreRow = [
    <Table.Cell key={0} style={style.header} width={2} children="Result" />,
  ];

  slicedMatches.forEach((match, index) => {
    OpponentRow.push(
      <Opponent key={index + 1} match={match} team={currentTeam} code={true} />
    );
    ScoreRow.push(
      <TeamFormScore key={index + 1} match={match} team={currentTeam} />
    );
    DateRow.push(
      <Table.Cell key={index + 1}>
        {match.match_start_local.split(" ")[0]}
      </Table.Cell>
    );
  });

  return (
    <div style={style.root}>
      <Table celled={true} size="small" textAlign="center">
        <Table.Body>
          <Table.Row children={OpponentRow} />
          <Table.Row children={ScoreRow} />
          <Table.Row children={DateRow} />
        </Table.Body>
      </Table>
    </div>
  );
}

export default TeamForm;
