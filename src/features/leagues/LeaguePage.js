import React, { useEffect } from "react";
import { Loader, Grid } from "semantic-ui-react";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { selectLeagueById } from "./leaguesSlice";
import { fetchMatches } from "../matches/matchesSlice";

import PageHeader from "../../app/PageHeader";
import ContentCard from "../../app/ContentCard";

function LeaguePage() {
  const dispatch = useDispatch();
  const { leagueId } = useParams();
  const league = useSelector((state) => selectLeagueById(state, +leagueId));

  const leagueMatchStatus = useSelector(
    (state) => state.matches.leaguesUpdated[+leagueId]
  );
  const matchesStatus = useSelector((state) => state.matches.status);

  useEffect(() => {
    if (league?.seasonId && !leagueMatchStatus && matchesStatus !== "loading") {
      dispatch(fetchMatches(league.league_id));
    }
  }, [dispatch, league, leagueMatchStatus, matchesStatus]);

  const renderedHeader = league ? (
    <PageHeader headerText={league.name} />
  ) : (
    <Loader active={true} />
  );

  return (
    <div>
      {renderedHeader}
      <Grid>
        <ContentCard type="standings" />
        <ContentCard type="matchResult" />
        <ContentCard type="matchUpcoming" />
      </Grid>
    </div>
  );
}

export default LeaguePage;
