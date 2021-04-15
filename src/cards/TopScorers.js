import React from "react";
import { Placeholder, Table } from "semantic-ui-react";

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectLeagueById } from "../features/leagues/leaguesSlice";
import PlayerDetail from "../features/players/PlayerDetail";

import { MAX_TOP_SCORERS } from "../config";

const style = {
  root: { height: "300px", overflowY: "auto" },
  playerName: { cursor: "pointer" },
  goalsOverall: {
    borderLeft: "1px solid rgba(34, 36, 38, 0.1)",
  },
};

const config = {
  placeholderLines: 13,
};

function TopScorers() {
  const { leagueId } = useParams();
  const league = useSelector((state) => selectLeagueById(state, +leagueId));
  const topScorers = league?.topScorers;

  if (!topScorers)
    return (
      <Placeholder fluid={true}>
        {Array.from({ length: config.placeholderLines }, (_, i) => (
          <Placeholder.Line key={i} />
        ))}
      </Placeholder>
    );

  return (
    <div style={style.root}>
      <Table celled={true} size="small">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={1} rowSpan="2">
              #
            </Table.HeaderCell>
            <Table.HeaderCell width={5} rowSpan="2">
              Player
            </Table.HeaderCell>
            <Table.HeaderCell colSpan="4">Goals</Table.HeaderCell>
            <Table.HeaderCell width={4} rowSpan="2">
              Played
            </Table.HeaderCell>
            <Table.HeaderCell width={2} rowSpan="2">
              Goal per 90Min
            </Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell width={1} style={style.goalsOverall}>
              Overall
            </Table.HeaderCell>
            <Table.HeaderCell width={1}>Home</Table.HeaderCell>
            <Table.HeaderCell width={1}>Away</Table.HeaderCell>
            <Table.HeaderCell width={1}>Penalty</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {topScorers.slice(0, MAX_TOP_SCORERS).map((p) => (
            <Table.Row key={p.player.player_id}>
              <Table.Cell>{p.pos}</Table.Cell>
              <PlayerDetail
                playerId={p.player.player_id}
                teamName={p.team.team_name}
                trigger={
                  <Table.Cell style={style.playerName}>
                    {p.player.player_name}
                  </Table.Cell>
                }
              />
              <Table.Cell>{p.goals.overall}</Table.Cell>
              <Table.Cell>{p.goals.home}</Table.Cell>
              <Table.Cell>{p.goals.away}</Table.Cell>
              <Table.Cell>{p.penalties || "0"}</Table.Cell>
              <Table.Cell>
                {p.matches_played} Games, {p.minutes_played} min
              </Table.Cell>
              <Table.Cell>
                {((p.goals.overall / p.minutes_played) * 90).toFixed(2)}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default TopScorers;
