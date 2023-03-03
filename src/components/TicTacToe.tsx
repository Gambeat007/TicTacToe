import { useState } from "react";
import {
  DIMENSIONS,
  GAME_STATES,
  PLAYER_O,
  PLAYER_X,
} from "../constants/constants";
import { generateRandomInt, switchPlayer } from "../utils/utils";
import {
  Container,
  Square,
  Marker,
  ButtonRow,
  InnerContainer,
} from "./TicTacToe.style";

const emptyGrid = new Array(DIMENSIONS ** 2).fill(null);

export default function TicTacToe() {
  const [grid, setGrid] = useState(emptyGrid);
  const [gameState, setGameState] = useState(GAME_STATES.notStartedYet);
  const [players, setPlayers] = useState<Record<string, number | null>>({
    person: null,
    computer: null,
  });

  const move = (index: number, player: number | null) => {
    if (player !== null) {
      setGrid((grid) => {
        const gridCopy = grid.concat();
        gridCopy[index] = player;
        return gridCopy;
      });
    }
  };

  const computerMove = () => {
    let index = generateRandomInt(0, 8);
    while (grid[index]) {
      index = generateRandomInt(0, 8);
    }
    move(index, players.computer);
  };

  const personMove = (index: number) => {
    if (!grid[index]) {
      move(index, players.person);
      computerMove();
    }
  };

  const choosePlayer = (option: number) => {
    setPlayers({ person: option, computer: switchPlayer(option) });
    setGameState(GAME_STATES.inProgress);
  };

  return gameState === GAME_STATES.notStartedYet ? (
    <div>
      <InnerContainer>
        <p>Choose your player</p>
        <ButtonRow>
          <button onClick={() => choosePlayer(PLAYER_X)}>X</button>
          <p>or</p>
          <button onClick={() => choosePlayer(PLAYER_O)}>O</button>
        </ButtonRow>
      </InnerContainer>
    </div>
  ) : (
    <Container dims={DIMENSIONS}>
      {grid.map((value, index) => {
        const isActive = value !== null;

        return (
          <Square key={index} onClick={() => personMove(index)}>
            {isActive && <Marker>{value === PLAYER_X ? "X" : "O"}</Marker>}
          </Square>
        );
      })}
    </Container>
  );
}
