import React from "react";
import { Loader, Grid } from "semantic-ui-react";

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectLeagueById } from "./leaguesSlice";

import PageHeader from "../../app/PageHeader";
import ContentCard from "../../app/ContentCard";

function LeaguePage() {
  const { leagueId } = useParams();
  // const dispatch = useDispatch();

  const league = useSelector((state) => selectLeagueById(state, +leagueId));

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
      </Grid>
    </div>
  );
}

export default LeaguePage;
