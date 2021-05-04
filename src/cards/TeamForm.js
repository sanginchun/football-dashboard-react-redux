import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Placeholder, Table } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchMatches,
  selectMatchesFinishedByTeam,
} from "../features/matches/matchesSlice";
import { selectTeamById } from "../features/teams/teamsSlice";

import Opponent from "../features/teams/Opponent";
import TeamFormScore from "../features/teams/TeamFormScore";
import { MAX_TEAM_FORM_MATCHES } from "../others/config";
import { useMediaQuery } from "../hooks/useMediaQuery";

const propTypes = {
  leagueId: PropTypes.number.isRequired,
  teamId: PropTypes.number.isRequired,
};

const style = {
  root: { overflowY: "auto" },
  header: { backgroundColor: "#f9fafb", fontWeight: "600" },
};

const config = {
  placeholderLines: 10,
};

function TeamForm({ leagueId, teamId }) {
  const dispatch = useDispatch();
  const currentTeam = useSelector((state) => selectTeamById(state, teamId));
  const matches = useSelector((state) =>
    selectMatchesFinishedByTeam(state, currentTeam?.name)
  );
  const leagueMatchesUpdated = useSelector(
    (state) => state.matches.updated[leagueId]
  );

  const isExSmall = useMediaQuery("(max-width: 600px)");

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

  const renderedTable = (
    <Table celled={true} size="small" textAlign="center" unstackable={true}>
      <Table.Body>
        <Table.Row children={OpponentRow} />
        <Table.Row children={ScoreRow} />
        <Table.Row children={DateRow} />
      </Table.Body>
    </Table>
  );

  const mobileTable = (
    <Table celled={true} size="small" textAlign="center" unstackable={true}>
      <Table.Header style={style.header}>
        <Table.Row>
          <Table.HeaderCell width={4}>Opponent</Table.HeaderCell>
          <Table.HeaderCell width={7}>Date</Table.HeaderCell>
          <Table.HeaderCell width={5}>Score</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {slicedMatches.map((match) => (
          <Table.Row key={match.match_id}>
            <Opponent match={match} team={currentTeam} code={true} />
            <Table.Cell>{match.match_start_local.split(" ")[0]}</Table.Cell>
            <TeamFormScore match={match} team={currentTeam} />
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );

  return (
    <div style={style.root}>{isExSmall ? mobileTable : renderedTable}</div>
  );
}

TeamForm.propTypes = propTypes;

export default TeamForm;
