import React from "react";
import { Loader, Grid } from "semantic-ui-react";

import { useSelector } from "react-redux";

import PageHeader from "../../app/PageHeader";
import ContentCard from "../../cards/ContentCard";
import CustomHeader from "./CustomHeader";

function CustomPage() {
  const customs = useSelector((state) => state.customs.data);
  const teamsStatus = useSelector((state) => state.teams.status);

  const renderedBody =
    teamsStatus === "succeeded" ? (
      <Grid>
        {customs.map((cardKey) => {
          const [leagueId, teamId, type] = cardKey.split("-");
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
      <CustomHeader />
      {renderedBody}
    </div>
  );
}

export default CustomPage;
