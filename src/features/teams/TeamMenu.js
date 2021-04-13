import React, { useEffect } from "react";
import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchTeams, selectTeamsIdsByLeagueId } from "./teamsSlice";
import TeamDetail from "./TeamDetail";

const propTypes = { leagueId: PropTypes.number };

function TeamMenu({ leagueId }) {
  const dispatch = useDispatch();
  const { leagueId: paramLeagueId } = useParams();
  const currentLeagueId = leagueId || (paramLeagueId ? +paramLeagueId : null);

  // status
  const teamIds = useSelector((state) =>
    selectTeamsIdsByLeagueId(state, currentLeagueId)
  );
  const teamsStatus = useSelector((state) => state.teams.status);

  useEffect(() => {
    if (currentLeagueId && !teamIds.length && teamsStatus !== "loading") {
      dispatch(fetchTeams(currentLeagueId));
    }
  }, [dispatch, currentLeagueId, teamIds, teamsStatus]);

  let renderedTeamMenu = null;
  if (teamIds.length) {
    renderedTeamMenu = teamIds.map((teamId) => (
      <TeamDetail key={teamId} teamId={teamId} />
    ));
  } else {
    renderedTeamMenu = null;
  }

  return renderedTeamMenu;
}

TeamMenu.propTypes = propTypes;

export default TeamMenu;
