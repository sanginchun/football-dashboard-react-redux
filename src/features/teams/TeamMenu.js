import React, { useEffect } from "react";
import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchTeams, selectTeamsByLeagueId } from "./teamsSlice";
import TeamDetail from "./TeamDetail";

const propTypes = { leagueId: PropTypes.number };

function TeamMenu({ leagueId }) {
  const dispatch = useDispatch();
  const { leagueId: paramLeagueId } = useParams();
  const currentLeagueId = leagueId || (paramLeagueId ? +paramLeagueId : null);

  // status
  const teams = useSelector((state) =>
    selectTeamsByLeagueId(state, currentLeagueId)
  );
  const teamsStatus = useSelector((state) => state.teams.status);

  useEffect(() => {
    if (currentLeagueId && !teams.length && teamsStatus !== "loading") {
      dispatch(fetchTeams(currentLeagueId));
    }
  }, [dispatch, currentLeagueId, teams, teamsStatus]);

  let renderedTeamMenu = null;
  if (teams.length) {
    renderedTeamMenu = teams.map((team) => (
      <TeamDetail key={team.team_id} team={team} />
    ));
  } else {
    renderedTeamMenu = null;
  }

  return renderedTeamMenu;
}

TeamMenu.propTypes = propTypes;

export default TeamMenu;
