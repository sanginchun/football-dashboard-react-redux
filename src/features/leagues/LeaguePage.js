import React from "react";
import { Loader, Grid } from "semantic-ui-react";

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectLeagueById } from "./leaguesSlice";

import PageHeader from "../../app/PageHeader";
import ContentCard from "../../cards/ContentCard";
import LeagueDetail from "./LeagueDetail";

function LeaguePage() {
  const { leagueId } = useParams();
  const league = useSelector((state) => selectLeagueById(state, +leagueId));

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
        {/* <ContentCard type="standings" leagueId={+leagueId} />
        <ContentCard type="matchResult" leagueId={+leagueId} />
        <ContentCard type="matchUpcoming" leagueId={+leagueId} />
        <ContentCard type="topScorers" leagueId={+leagueId} /> */}
      </Grid>
    </div>
  );
}

export default LeaguePage;
