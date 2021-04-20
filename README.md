# ⚽ Football Dashboard - React, Redux

- Implementing redux to previous react project; [Football Dashboard - React](https://github.com/sanginchun/football-dashboard-react)

## Table of Contents

- [Previous Versions](https://github.com/sanginchun/football-dashboard-react#previous-versions)
- [Description](https://github.com/sanginchun/football-dashboard-react#description)
- [Improvements](https://github.com/sanginchun/football-dashboard-react#improvements)
- [Further Improvements](https://github.com/sanginchun/football-dashboard-react#further-improvements)

## Previous Versions

- [Vanilla JS](https://github.com/sanginchun/football-dashboard)
- [React](https://github.com/sanginchun/football-dashboard-react)

## Description

- Football dashboard is a single-page application that shows up-to-date information about football leagues and teams.
- Used [SportDataApi](https://app.sportdataapi.com/) which is not a public api, so error might occur due to the request limit.
- Built with Vanilla JS first, then making improvements using React, Redux.

## Improvements

- App Structure: Split and organized components and scripts by their roles and features, making project more managable.

  - [api](https://github.com/sanginchun/football-dashboard-react-redux/tree/master/src/api)
  - [app](https://github.com/sanginchun/football-dashboard-react-redux/tree/master/src/app): Components to build basic layout
  - [features](https://github.com/sanginchun/football-dashboard-react-redux/tree/master/src/features): Components and scripts consisting each feature
    - customs, leagues, matches, players, teams, topScorers
    - each feature has its own 'slice', which is responsible for initializing state, fetching data, exporting actions, handling actions in reducers, exporting selectors.
    - referenced the official [tutorial for Redux](https://redux.js.org/tutorials/essentials/part-1-overview-concepts) and usage guide of [Redux Toolkit](https://redux-toolkit.js.org/usage/usage-guide)
  - [cards]: Card component, content detail components
  - [others]: helper, config

- Keeping states ['normalized'](https://redux.js.org/tutorials/essentials/part-6-performance-normalization#normalized-state-structure), more maintainable way.

```JavaScript
// example
{
  leagues: {
    ids: [538, 392],
    entities: {
      392: {
        league_id: 392,
        country_id,
        season_id,
        name: "Serie A",
      },
      538: {
        league_id: 538,
        country_id,
        season_id,
        name: "LaLiga",
      }
    },
    status: "succeeded",
    error: null,
  },

  teams: {
    ids: [4798, 4795, 3511, ] // ... and more
    entities: {
      3511: {
        team_id: 3511,
        short_code: "ATA",
        name: "Atalanta Bergamasca Calcio",
        logo: "https://cdn.sportdataapi.com/images/soccer/teams/100/109.png",
      },
      // ...
    },
    status: "succeeded",
    error: null,
  }
}

```

- Made components that is directly related to specific data to take responsibility to fetch the data.

  - For example, [MainNav](https://github.com/sanginchun/football-dashboard-react-redux/blob/master/src/app/MainNav.js) component only fetches 'leagues', then its child component [TeamMenu](https://github.com/sanginchun/football-dashboard-react-redux/blob/master/src/features/teams/TeamMenu.js) fetches all the teams and renders teams of current league.
  - Page components such as [LeaguePage](https://github.com/sanginchun/football-dashboard-react-redux/blob/master/src/features/leagues/LeaguePage.js), [TeamPage](https://github.com/sanginchun/football-dashboard-react-redux/blob/master/src/features/teams/TeamPage.js) doesn't try to fetch league or team data, instead they just render Loader component when data isn't loaded. When data is loaded by nav components, they render card components. Likewise, card components then fetches the detail data concerned.
  - Easier to manage code since each component has clear responsibility for fetching specific data.

- Router

  - In App component

  ```JSX
  // omit imports, style

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
              <Route exact path="/custom" render={() => <CustomPage />} />
              <Route
                exact
                path="/league/:leagueId"
                render={() => <LeaguePage />}
              />
              <Route
                exact
                path="/league/:leagueId/:teamId"
                render={() => <TeamPage />}
              />
              <Route render={() => <div>MainDisplay</div>} />
            </Switch>
          </MainDisplay>
        </BrowserRouter>
      </div>
    );
  }
  ```

  - Managed main content display area as routes, used leagueId, teamId as params so that each page component could make use of them.
  - More readable structure, easy to scale when adding new page to the app.
  - \*Home page, redirection when invalid path need to be updated.

## Further Improvements

- Login functionality
  - keeping custom page settings in an account
  - Multiple custom pages, giving page titles each
- Refactor inline css codes using CSS-In-JS libraries such as styled-components
