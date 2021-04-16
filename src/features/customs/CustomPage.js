import React from "react";
import { Loader, Grid } from "semantic-ui-react";

import { useSelector } from "react-redux";

import PageHeader from "../../app/PageHeader";
import ContentCard from "../../cards/ContentCard";

function CustomPage() {
  const customs = useSelector((state) => state.customs);
  const teamsStatus = useSelector((state) => state.teams.status);

  const renderedBody =
    teamsStatus === "succeeded" ? (
      <Grid>
        {customs.map((cardKey) => {
          const [leagueId, teamId, type] = cardKey.split("-");
          console.log(leagueId, teamId, type);
          return (
            <ContentCard
              key={cardKey}
              type={type}
              leagueId={+leagueId}
              teamId={+teamId}
              isCustom={true}
            />
          );
        })}
      </Grid>
    ) : (
      <Loader active={true} size="large">
        Loading
      </Loader>
    );

  return (
    <div>
      <PageHeader>
        <h2>Custom</h2>
      </PageHeader>
      {renderedBody}
    </div>
  );
}

export default CustomPage;
