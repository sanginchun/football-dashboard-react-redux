import React from "react";
import { Grid, Card } from "semantic-ui-react";

import PageHeader from "./PageHeader";
import { style } from "../cards/ContentCard";

const listStyles = {
  ul: {
    marginTop: "1rem",
    paddingInlineStart: "1rem",
    listStyle: "none",
    color: "#333",
    fontSize: "1.1rem",
  },
  li: { marginBottom: "1rem" },
};

const howToTexts = [
  "1. Navigate through League and Team tabs.",
  "2. Create your own dashboard by adding contents.",
  "3. Check it out on Custom tab and edit.",
  "4. Have fun 🙂",
];

function HomePage() {
  return (
    <div>
      <PageHeader>
        <h2>Welcome to Football Dashboard !</h2>
      </PageHeader>
      <Grid>
        <Grid.Column width={12}>
          <Card fluid={true} style={style.card}>
            <Card.Content>
              <Card.Header style={style.cardHeader}>
                <h3>{"How To Use"}</h3>
              </Card.Header>
              <Card.Description style={style.cardDescription}>
                <ul style={listStyles.ul}>
                  {howToTexts.map((text) => (
                    <li style={listStyles.li} key={text}>
                      {text}
                    </li>
                  ))}
                </ul>
              </Card.Description>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default HomePage;
