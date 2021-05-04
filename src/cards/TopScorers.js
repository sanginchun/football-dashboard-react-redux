import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Placeholder, Table } from "semantic-ui-react";

import { useDispatch, useSelector } from "react-redux";

import PlayerDetail from "../features/players/PlayerDetail";

import { MAX_TOP_SCORERS } from "../others/config";
import { fetchTopScorers } from "../features/topScorers/topScorersSlice";
import { useMediaQuery } from "../hooks/useMediaQuery";

const propTypes = {
  leagueId: PropTypes.number.isRequired,
};

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

function TopScorers({ leagueId }) {
  const dispatch = useDispatch();
  const topScorers = useSelector(
    (state) => state.topScorers[leagueId].topScorers
  );

  const isSmall = useMediaQuery("(max-width: 800px)");
  const isExSmall = useMediaQuery("(max-width: 600px)");

  useEffect(() => {
    if (!topScorers) dispatch(fetchTopScorers(leagueId));
  }, [dispatch, topScorers, leagueId]);

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
      <Table celled={true} size="small" unstackable={true}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={1} rowSpan="2">
              #
            </Table.HeaderCell>
            <Table.HeaderCell width={5} rowSpan="2">
              Player
            </Table.HeaderCell>
            <Table.HeaderCell colSpan={isExSmall ? 2 : 4}>
              Goals
            </Table.HeaderCell>
            {isSmall ? null : (
              <Table.HeaderCell width={4} rowSpan="2">
                Played
              </Table.HeaderCell>
            )}
            <Table.HeaderCell width={2} rowSpan="2">
              Goal per 90Min
            </Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell width={1} style={style.goalsOverall}>
              Overall
            </Table.HeaderCell>
            {isExSmall ? null : (
              <>
                <Table.HeaderCell width={1}>Home</Table.HeaderCell>
                <Table.HeaderCell width={1}>Away</Table.HeaderCell>
              </>
            )}
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
              {isExSmall ? null : (
                <>
                  <Table.Cell>{p.goals.home}</Table.Cell>
                  <Table.Cell>{p.goals.away}</Table.Cell>
                </>
              )}
              <Table.Cell>{p.penalties || "0"}</Table.Cell>
              {isSmall ? null : (
                <Table.Cell>
                  {p.matches_played} Games, {p.minutes_played} min
                </Table.Cell>
              )}
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

TopScorers.propTypes = propTypes;

export default TopScorers;
