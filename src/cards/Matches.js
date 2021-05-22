import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { Placeholder, Table } from "semantic-ui-react";

import { useDispatch, useSelector } from "react-redux";

import MatchDetail from "../features/matches/MatchDetail";
import {
  fetchMatches,
  selectMatchesFinished,
  selectMatchesUpcoming,
} from "../features/matches/matchesSlice";
import DatePicker from "./DatePicker";
import { getUniqueDates } from "../others/helper";

const propTypes = {
  subType: PropTypes.string.isRequired,
  leagueId: PropTypes.number.isRequired,
};

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

function Matches({ subType, leagueId }) {
  const dispatch = useDispatch();
  const matches = useSelector((state) =>
    config[subType].selector(state, leagueId)
  );

  const leagueMatchesUpdated = useSelector(
    (state) => state.matches.updated[leagueId]
  );
  const [date, setDate] = useState("");

  // fetch
  useEffect(() => {
    if (!leagueMatchesUpdated) {
      dispatch(fetchMatches(leagueId));
    }
  }, [dispatch, leagueMatchesUpdated, leagueId]);

  // when loaded
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

  if (!matches.length) {
    if (leagueMatchesUpdated) {
      return (
        <div>
          <h3>No Matches</h3>
        </div>
      );
    }
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
        <Table celled={true} size="small" textAlign="center" unstackable={true}>
          <Table.Header>
            <Table.Row>{renderedHeader}</Table.Row>
          </Table.Header>
          <Table.Body>{renderedBody}</Table.Body>
        </Table>
      </div>
    </React.Fragment>
  );
}

Matches.propTypes = propTypes;

export default Matches;
