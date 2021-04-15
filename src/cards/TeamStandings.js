import React, { useEffect, useRef } from "react";
import { Placeholder, Table, Ref } from "semantic-ui-react";

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectLeagueById } from "../features/leagues/leaguesSlice";
import { selectTeamById } from "../features/teams/teamsSlice";

import TeamDetail from "../features/teams/TeamDetail";

const style = {
  root: { maxHeight: "300px", overflowY: "auto" },
  tableHeaderCell: { position: "sticky", top: "0" },
  currentTeam: { backgroundColor: "lightcyan" },
};

const config = {
  placeholderLines: 12,
  tableHeader: ["#", "Team", "Points", "Diff", "Played", "W", "D", "L"],
};

function TeamStandings() {
  const { leagueId, teamId } = useParams();
  const league = useSelector((state) => selectLeagueById(state, +leagueId));
  const currentTeam = useSelector((state) => selectTeamById(state, +teamId));
  const currentTeamRef = useRef(null);

  useEffect(() => {
    if (currentTeam) {
      currentTeamRef.current.scrollIntoView({ block: "center" });
    }
  }, [currentTeam]);

  if (!league?.standings || !currentTeam)
    return (
      <Placeholder fluid={true}>
        {Array.from({ length: config.placeholderLines }, (_, i) => (
          <Placeholder.Line key={i} />
        ))}
      </Placeholder>
    );

  const [currentTeamStanding] = league.standings.filter(
    (team) => team.team_id === currentTeam.team_id
  );
  const { points: currentTeamPoints } = currentTeamStanding;

  const renderedHeader = config.tableHeader.map((text, i) => (
    <Table.HeaderCell key={i} style={style.tableHeaderCell}>
      {text}
    </Table.HeaderCell>
  ));

  const renderedBody = league.standings.map((team) => {
    const isCurrent = team.team_id === currentTeam.team_id;
    const diff = team.points - currentTeamPoints;

    return (
      <Ref key={team.team_id} innerRef={isCurrent ? currentTeamRef : null}>
        <Table.Row style={isCurrent ? style.currentTeam : null}>
          <Table.Cell width={1}>{team.position}</Table.Cell>
          <Table.Cell
            width={3}
            children={<TeamDetail teamId={team.team_id} code={true} />}
          />
          <Table.Cell width={2}>{team.points}</Table.Cell>
          <Table.Cell width={2}>{diff > 0 ? `+${diff}` : `${diff}`}</Table.Cell>
          <Table.Cell width={2}>{team.overall.games_played}</Table.Cell>
          <Table.Cell width={1}>{team.overall.won}</Table.Cell>
          <Table.Cell width={1}>{team.overall.draw}</Table.Cell>
          <Table.Cell width={1}>{team.overall.lost}</Table.Cell>
        </Table.Row>
      </Ref>
    );
  });

  return (
    <div style={style.root}>
      <Table celled={true} size="small">
        <Table.Header>
          <Table.Row>{renderedHeader}</Table.Row>
        </Table.Header>
        <Table.Body>{renderedBody}</Table.Body>
      </Table>
    </div>
  );
}

export default TeamStandings;
