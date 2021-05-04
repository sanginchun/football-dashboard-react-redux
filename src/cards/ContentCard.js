import React from "react";
import PropTypes from "prop-types";
import { Card, Grid, Popup, Checkbox } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";

import Standings from "./Standings";
import Matches from "./Matches";
import TopScorers from "./TopScorers";

import TeamStandings from "./TeamStandings";
import TeamSchedule from "./TeamSchedule";
import TeamForm from "./TeamForm";

import {
  ADD,
  REMOVE,
  customsUpdated,
  cardSelectionToggled,
} from "../features/customs/customsSlice";
import { getCardKey } from "../others/helper";
import TeamDetail from "../features/teams/TeamDetail";
import LeagueDetail from "../features/leagues/LeagueDetail";
import { useMediaQuery } from "../hooks/useMediaQuery";

const propTypes = {
  type: PropTypes.string.isRequired,
  leagueId: PropTypes.number.isRequired,
  teamId: PropTypes.number,
  isCustom: PropTypes.bool,
};

const defaultProps = { isCustom: false };

export const style = {
  card: { minHeight: "280px" },
  cardHeader: { display: "flex" },
  headerDetail: {
    marginLeft: "auto",
    marginRight: "1rem",
    fontWeight: "600",
  },
  editModeCheckbox: {
    float: "right",
    marginLeft: "1rem",
  },
  toggleButton: { marginLeft: "auto" },
  cardDescription: {
    marginTop: "1.2rem",
    overflowY: "hidden",
  },
  editMode: {
    opacity: "0.5",
    pointerEvents: "none",
  },
  editModeSelected: {
    opacity: "1",
    pointerEvents: "none",
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
  teamSchedule: {
    width: 8,
    title: "Upcoming",
    Content: TeamSchedule,
  },
  teamForm: {
    width: 16,
    title: "Form",
    Content: TeamForm,
  },
};

function ContentCard({ type, leagueId, teamId, isCustom }) {
  const dispatch = useDispatch();
  const cardKey = getCardKey(leagueId, teamId, type);
  const isChecked = useSelector((state) =>
    state.customs.data.includes(cardKey)
  );
  const isEditMode = useSelector((state) => state.customs.editMode);
  const isSelected = useSelector((state) =>
    state.customs.selected.includes(cardKey)
  );

  const isSmall = useMediaQuery("(max-width: 800px)");

  const { width, title, subType, Content } = cardConfig[type];

  const renderedHeader = isCustom ? (
    <div style={style.headerDetail}>
      {teamId ? (
        <TeamDetail teamId={teamId} />
      ) : (
        <LeagueDetail leagueId={leagueId} />
      )}
    </div>
  ) : (
    <Popup
      content={isChecked ? "Remove from custom page" : "Add to custom page"}
      size="small"
      trigger={
        <Checkbox
          checked={isChecked}
          style={style.toggleButton}
          toggle={true}
          onClick={(e) => {
            e.preventDefault();
            dispatch(
              customsUpdated({
                type: isChecked ? REMOVE : ADD,
                key: cardKey,
              })
            );
          }}
        />
      }
    />
  );

  const editModeCheckbox = isEditMode ? (
    <Checkbox
      checked={isSelected}
      style={style.editModeCheckbox}
      onChange={(e) => {
        e.preventDefault();
        dispatch(
          cardSelectionToggled({
            type: isSelected ? REMOVE : ADD,
            key: cardKey,
          })
        );
      }}
    />
  ) : null;

  return (
    <Grid.Column width={isSmall ? 16 : width}>
      <Card fluid={true} style={style.card}>
        <Card.Content>
          {editModeCheckbox}
          <div
            style={
              isEditMode
                ? isSelected
                  ? style.editModeSelected
                  : style.editMode
                : null
            }
          >
            <Card.Header style={style.cardHeader}>
              <h3>{title}</h3>
              {renderedHeader}
            </Card.Header>
            <Card.Description style={style.cardDescription}>
              <Content subType={subType} leagueId={leagueId} teamId={teamId} />
            </Card.Description>
          </div>
        </Card.Content>
      </Card>
    </Grid.Column>
  );
}

ContentCard.propTypes = propTypes;
ContentCard.defaultProps = defaultProps;

export default ContentCard;
