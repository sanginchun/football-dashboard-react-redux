import React, { useEffect } from "react";
import { Loader, Grid } from "semantic-ui-react";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { selectLeagueById } from "./leaguesSlice";
import { fetchMatches } from "../matches/matchesSlice";
import { fetchTopScorers } from "../leagues/leaguesSlice";

import PageHeader from "../../app/PageHeader";
import ContentCard from "../../cards/ContentCard";
import LeagueDetail from "./LeagueDetail";

function LeaguePage() {
  const dispatch = useDispatch();
  const { leagueId } = useParams();
  const league = useSelector((state) => selectLeagueById(state, +leagueId));

  const leagueMatchStatus = useSelector(
    (state) => state.matches.leaguesUpdated[+leagueId]
  );
  const topScorersStatus = useSelector(
    (state) => state.leagues.topScorersStatus
  );
  const matchesStatus = useSelector((state) => state.matches.status);

  useEffect(() => {
    if (league?.seasonId && !leagueMatchStatus && matchesStatus !== "loading") {
      dispatch(fetchMatches(league.league_id));
    }
  }, [dispatch, league, leagueMatchStatus, matchesStatus]);

  useEffect(() => {
    if (
      league?.seasonId &&
      !league.topScorers &&
      topScorersStatus !== "loading"
    ) {
      dispatch(
        fetchTopScorers({
          leagueId: league.league_id,
          seasonId: league.seasonId,
        })
      );
    }
  }, [dispatch, league, topScorersStatus]);

  const renderedHeader = (
    <PageHeader>
      {league ? (
        <LeagueDetail leagueId={league.league_id} header={true} />
      ) : (
        <Loader active={true} inline={true} />
      )}
    </PageHeader>
  );

  return (
    <div>
      {renderedHeader}
      <Grid>
        <ContentCard type="standings" />
        <ContentCard type="matchResult" />
        <ContentCard type="matchUpcoming" />
        <ContentCard type="topScorers" />
      </Grid>
    </div>
  );
}

export default LeaguePage;
