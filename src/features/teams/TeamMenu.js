import React, { useEffect } from "react";
import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";

import { fetchTeams, selectTeamsIdsByLeagueId } from "./teamsSlice";
import TeamDetail from "./TeamDetail";
import { Dropdown } from "semantic-ui-react";

const propTypes = { currentLeagueId: PropTypes.number };

function TeamMenu({ currentLeagueId }) {
  const dispatch = useDispatch();

  const teamIds = useSelector((state) =>
    selectTeamsIdsByLeagueId(state, currentLeagueId)
  );
  const teamsStatus = useSelector((state) => state.teams.status);

  useEffect(() => {
    if (teamsStatus === "idle") {
      dispatch(fetchTeams());
    }
  }, [dispatch, teamsStatus]);

  if (teamsStatus !== "succeeded") return null;

  const renderedTeamMenu = teamIds.map((teamId) => (
    <Dropdown.Item key={teamId}>
      <TeamDetail teamId={teamId} />
    </Dropdown.Item>
  ));

  return renderedTeamMenu;
}

TeamMenu.propTypes = propTypes;

export default TeamMenu;
