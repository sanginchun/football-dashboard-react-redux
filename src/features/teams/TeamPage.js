import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { selectLeagueById } from "../leagues/leaguesSlice";
import { fetchMatches } from "../matches/matchesSlice";

import PageHeader from "../../app/PageHeader";
import ContentCard from "../../cards/ContentCard";
import { selectTeamById } from "./teamsSlice";

function TeamPage() {
  const dispatch = useDispatch();
  const { leagueId, teamId } = useParams();
  const league = useSelector((state) => selectLeagueById(state, +leagueId));
  const team = useSelector((state) => selectTeamById(state, +teamId));

  const leagueMatchStatus = useSelector(
    (state) => state.matches.leaguesUpdated[+leagueId]
  );
  const matchesStatus = useSelector((state) => state.matches.status);

  useEffect(() => {
    if (league?.seasonId && !leagueMatchStatus && matchesStatus !== "loading") {
      dispatch(fetchMatches(league.league_id));
    }
  }, [dispatch, league, leagueMatchStatus, matchesStatus]);

  const renderedHeader = <PageHeader headerText={team ? team.name : ""} />;

  return (
    <div>
      {renderedHeader}
      <Grid>
        <ContentCard type="teamStandings" />
        {/* <ContentCard type="teamSchedule" /> */}
        {/* <ContentCard type="teamForm" /> */}
      </Grid>
    </div>
  );
}

export default TeamPage;