import React, { useEffect } from "react";
import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";

import { fetchTeams, selectTeamsIdsByLeagueId } from "./teamsSlice";
import TeamDetail from "./TeamDetail";
import { Dropdown } from "semantic-ui-react";
import { useMediaQuery } from "../../hooks/useMediaQuery";

const propTypes = { currentLeagueId: PropTypes.number };

function TeamMenu({ currentLeagueId }) {
  const dispatch = useDispatch();

  const isExSmall = useMediaQuery("(max-width: 350px)");

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
    <Dropdown.Item
      key={teamId}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          const a = e.target.querySelector("a");
          a.click();
        }
      }}
    >
      <TeamDetail teamId={teamId} code={isExSmall} />
    </Dropdown.Item>
  ));

  return renderedTeamMenu;
}

TeamMenu.propTypes = propTypes;

export default TeamMenu;
