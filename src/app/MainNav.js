import React, { useEffect } from "react";
import { Route, Link, Switch } from "react-router-dom";
import { Menu, Loader, Dropdown } from "semantic-ui-react";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchLeagues,
  selectLeagueIds,
} from "../features/leagues/leaguesSlice";

import LeagueDetail from "../features/leagues/LeagueDetail";
import TeamMenu from "../features/teams/TeamMenu";

const style = {
  root: { position: "relative", marginTop: "4rem" },
  teamMenu: { maxHeight: "300px", overflowY: "scroll" },
};

function MainNav() {
  const dispatch = useDispatch();
  const leaguesIds = useSelector(selectLeagueIds);

  // status
  const leaguesStatus = useSelector((state) => state.leagues.status);
  const teamsStatus = useSelector((state) => state.teams.status);

  const isLoading = leaguesStatus === "loading" || teamsStatus === "loading";

  // fetch leagues when mount
  useEffect(() => {
    if (leaguesStatus === "idle") dispatch(fetchLeagues());
  }, [leaguesStatus, dispatch]);

  // rendered components
  const renderedLeagueMenu = leaguesIds.map((leagueId) => (
    <LeagueDetail key={leagueId} leagueId={leagueId} />
  ));

  return (
    <nav style={style.root}>
      <Menu vertical={true} size="large">
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
            <Switch>
              <Route path="/league/:leagueId" render={() => <TeamMenu />} />
              <Route render={() => <TeamMenu leagueId={leaguesIds[0]} />} />
            </Switch>
          </Dropdown.Menu>
        </Dropdown>
      </Menu>
    </nav>
  );
}

export default MainNav;
