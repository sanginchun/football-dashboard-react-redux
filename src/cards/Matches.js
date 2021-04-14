import React, { useEffect, useState } from "react";
import { Placeholder, Table } from "semantic-ui-react";

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import MatchDetail from "../features/matches/MatchDetail";
import {
  selectMatchesFinished,
  selectMatchesUpcoming,
} from "../features/matches/matchesSlice";
import DatePicker from "../app/DatePicker";
import { getUniqueDates } from "../helper";

const style = {
  root: { height: "260px", overflowY: "auto" },
  tableHeaderCell: { position: "sticky", top: "0" },
};

const config = {
  result: {
    placeholderLines: 12,
    tableHeader: ["Home", "Score", "Away"],
    selector: selectMatchesFinished,
  },
  upcoming: {
    placeholderLines: 12,
    tableHeader: ["Home", "Schedule", "Away"],
    selector: selectMatchesUpcoming,
  },
};

function Matches({ subType }) {
  const { leagueId } = useParams();
  const matches = useSelector((state) =>
    config[subType].selector(state, +leagueId)
  );
  const teamsStatus = useSelector((state) => state.teams.status);

  // date
  const [date, setDate] = useState("");

  useEffect(() => {
    if (matches.length) {
      setDate(
        getUniqueDates(
          matches.map((match) => match.match_start_local),
          subType
        )[0]
      );
    }
  }, [matches, subType]);

  // if match not loaded or team not loaded
  if (!matches.length || teamsStatus === "loading") {
    return (
      <Placeholder fluid={true}>
        {Array.from({ length: config[subType].placeholderLines }, (_, i) => (
          <Placeholder.Line key={i} />
        ))}
      </Placeholder>
    );
  }

  const renderedDatePicker = (
    <DatePicker
      key={`${leagueId}${subType}`}
      dateArr={getUniqueDates(
        matches.map((match) => match.match_start_local),
        subType
      )}
      onChange={setDate}
    />
  );

  const renderedHeader = config[subType].tableHeader.map((text, i) => (
    <Table.HeaderCell
      key={i}
      width={i % 2 ? 6 : 5}
      style={style.tableHeaderCell}
    >
      {text}
    </Table.HeaderCell>
  ));

  const filteredMatches = matches.filter(
    (match) => match.match_start_local.slice(0, 10) === date
  );

  const renderedBody = filteredMatches.map((match) => (
    <Table.Row key={match.match_id}>
      <MatchDetail match={match} subType={subType} />
    </Table.Row>
  ));

  return (
    <React.Fragment>
      {renderedDatePicker}
      <div style={style.root}>
        <Table celled={true} size="small" textAlign="center">
          <Table.Header>
            <Table.Row>{renderedHeader}</Table.Row>
          </Table.Header>
          <Table.Body>{renderedBody}</Table.Body>
        </Table>
      </div>
    </React.Fragment>
  );
}

export default Matches;
