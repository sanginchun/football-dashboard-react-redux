import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Sidebar from "./app/Sidebar";
import AppLogo from "./app/AppLogo";
import MainNav from "./app/MainNav";
import MainDisplay from "./app/MainDisplay";
import LeaguePage from "./features/leagues/LeaguePage";

const style = { position: "relative" };

function App() {
  return (
    <div style={style}>
      <BrowserRouter>
        <Sidebar>
          <AppLogo />
          <MainNav />
        </Sidebar>
        <MainDisplay>
          <Switch>
            <Route
              exact
              path="/league/:leagueId"
              render={() => <LeaguePage />}
            />
            <Route render={() => <div>MainDisplay</div>} />
          </Switch>
        </MainDisplay>
      </BrowserRouter>
    </div>
  );
}

export default App;
