import React from "react";
import PropTypes from "prop-types";
import { Card, Grid } from "semantic-ui-react";
import Standings from "./Standings";
import Matches from "./Matches";
import TopScorers from "./TopScorers";

import TeamStandings from "./TeamStandings";

const propTypes = { type: PropTypes.string.isRequired };

const style = {
  card: { minHeight: "280px" },
  cardHeader: { display: "flex" },
  cardDescription: {
    marginTop: "1.2rem",
    overflowY: "hidden",
  },
};

const cardConfig = {
  standings: {
    width: 16,
    title: "Standings",
    Content: Standings,
  },
  matchResult: {
    width: 8,
    title: "Results",
    subType: "result",
    Content: Matches,
  },
  matchUpcoming: {
    width: 8,
    title: "Upcoming",
    subType: "upcoming",
    Content: Matches,
  },
  topScorers: {
    width: 16,
    title: "Top Scorers",
    Content: TopScorers,
  },
  teamStandings: {
    width: 8,
    title: "Standings",
    Content: TeamStandings,
  },
};

function ContentCard({ type }) {
  const { width, title, subType, Content } = cardConfig[type];
  return (
    <Grid.Column width={width}>
      <Card fluid={true} style={style.card}>
        <Card.Content>
          <Card.Header style={style.cardHeader}>
            <h3>{title}</h3>
          </Card.Header>
          <Card.Description style={style.cardDescription}>
            <Content subType={subType} />
          </Card.Description>
        </Card.Content>
      </Card>
    </Grid.Column>
  );
}

ContentCard.propTypes = propTypes;

export default ContentCard;
