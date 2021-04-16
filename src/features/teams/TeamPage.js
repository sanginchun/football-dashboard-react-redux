import React from "react";
import { Grid, Loader } from "semantic-ui-react";

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import PageHeader from "../../app/PageHeader";
import ContentCard from "../../cards/ContentCard";
import { selectTeamById } from "./teamsSlice";
import TeamDetail from "./TeamDetail";

function TeamPage() {
  const { leagueId, teamId } = useParams();
  const team = useSelector((state) => selectTeamById(state, +teamId));

  const renderedHeader = (
    <PageHeader>
      {team ? (
        <TeamDetail teamId={team.team_id} header={true} />
      ) : (
        <Loader active={true} inline={true} />
      )}
    </PageHeader>
  );

  const renderedBody = team ? (
    <Grid>
      <ContentCard type="teamStandings" leagueId={+leagueId} teamId={+teamId} />
      <ContentCard type="teamSchedule" leagueId={+leagueId} teamId={+teamId} />
      <ContentCard type="teamForm" leagueId={+leagueId} teamId={+teamId} />
    </Grid>
  ) : (
    <Loader active={true} size="large">
      Loading
    </Loader>
  );

  return (
    <div>
      {renderedHeader}
      {renderedBody}
    </div>
  );
}

export default TeamPage;
