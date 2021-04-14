import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Loader, Table, Flag } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlayer, selectPlayerById } from "./playersSlice";

const propTypes = {
  playerId: PropTypes.number.isRequired,
  teamName: PropTypes.string.isRequired,
  trigger: PropTypes.object.isRequired,
};

function PlayerDetail({ playerId, teamName, trigger }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  // fetch
  const player = useSelector((state) => selectPlayerById(state, playerId));
  const playersStatus = useSelector((state) => state.players.status);

  useEffect(() => {
    if (open && !player && playersStatus !== "loading") {
      dispatch(fetchPlayer(playerId));
    }
  }, [dispatch, open, player, playerId, playersStatus]);

  const renderedModalContent = player ? (
    <React.Fragment>
      <Modal.Header>Player Info</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Table celled={true} size="large">
            <Table.Body>
              <Table.Row>
                <Table.Cell width={4}>Name</Table.Cell>
                <Table.Cell>
                  {player.firstname} {player.lastname}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Team</Table.Cell>
                <Table.Cell>{teamName}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Country</Table.Cell>
                <Table.Cell>
                  {<Flag name={player.country.country_code} />}{" "}
                  {player.country.name}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Age / Birthday</Table.Cell>
                <Table.Cell>{`${player.age} / ${player.birthday}`}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Height, Weight</Table.Cell>
                <Table.Cell>{`${player.height}cm, ${player.weight}kg`}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="Close"
          labelPosition="right"
          icon="checkmark"
          onClick={() => setOpen(false)}
        />
      </Modal.Actions>
    </React.Fragment>
  ) : (
    <Loader active={true} />
  );

  return (
    <Modal
      open={open}
      size="small"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={trigger}
    >
      {renderedModalContent}
    </Modal>
  );
}

PlayerDetail.propTypes = propTypes;

export default PlayerDetail;
