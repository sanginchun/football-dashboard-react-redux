import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, Loader, Dropdown } from "semantic-ui-react";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchLeagues,
  selectLeagueIds,
} from "../features/leagues/leaguesSlice";

import LeagueDetail from "../features/leagues/LeagueDetail";
import TeamMenu from "../features/teams/TeamMenu";
import { useMediaQuery } from "../hooks/useMediaQuery";

const style = {
  root: { position: "relative", marginTop: "4rem" },
  teamMenu: { maxHeight: "300px", overflowY: "scroll" },
};

function MainNav() {
  const dispatch = useDispatch();
  const leaguesIds = useSelector(selectLeagueIds);
  const [currentLeagueId, setCurrentLeagueId] = useState(null);

  const isExSmall = useMediaQuery("(max-width: 600px)");

  // status
  const leaguesStatus = useSelector((state) => state.leagues.status);
  const teamsStatus = useSelector((state) => state.teams.status);

  const isLoading = leaguesStatus === "loading" || teamsStatus === "loading";

  // fetch leagues when mount
  useEffect(() => {
    if (leaguesStatus === "idle") dispatch(fetchLeagues());
  }, [leaguesStatus, dispatch]);

  useEffect(() => {
    if (teamsStatus === "succeeded") setCurrentLeagueId(leaguesIds[0]);
  }, [teamsStatus, leaguesIds]);

  // rendered components
  const renderedLeagueMenu = leaguesIds.map((leagueId) => (
    <Dropdown.Item key={leagueId} onClick={() => setCurrentLeagueId(leagueId)}>
      <LeagueDetail leagueId={leagueId} />
    </Dropdown.Item>
  ));

  return (
    <nav style={style.root}>
      <Menu vertical={true} size={isExSmall ? "tiny" : "large"}>
        <Loader active={isLoading} />
        <Menu.Item as={Link} to={"/custom"} disabled={isLoading}>
          Custom
        </Menu.Item>
        <Dropdown
          text="League"
          item={true}
          disabled={isLoading || leaguesStatus !== "succeeded"}
        >
          <Dropdown.Menu>{renderedLeagueMenu}</Dropdown.Menu>
        </Dropdown>
        <Dropdown
          text="Team"
          item={true}
          disabled={isLoading || teamsStatus !== "succeeded"}
        >
          <Dropdown.Menu style={style.teamMenu}>
            <TeamMenu currentLeagueId={currentLeagueId} />
          </Dropdown.Menu>
        </Dropdown>
      </Menu>
    </nav>
  );
}

export default MainNav;
