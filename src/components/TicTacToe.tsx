import { useCallback, useEffect, useState } from "react";
import { generateRandomInt, switchPlayer } from "../utils/utils";
import {
  DIMENSIONS,
  DRAW,
  GAME_STATES,
  PLAYER_O,
  PLAYER_X,
} from "../constants/constants";
import Board from "./Board";
import {
  Container,
  Square,
  Marker,
  ButtonRow,
  InnerContainer,
} from "./TicTacToe.style";

const emptyGrid = new Array(DIMENSIONS ** 2).fill(null);
const board = new Board();

export default function TicTacToe() {
  const [grid, setGrid] = useState(emptyGrid);
  const [gameState, setGameState] = useState(GAME_STATES.notStartedYet);
  const [nextMove, setNextMove] = useState<null | number>(null);
  const [winner, setWinner] = useState<null | string>(null);
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

  const personMove = (index: number) => {
    if (!grid[index] && nextMove === players.person) {
      move(index, players.person);
      setNextMove(players.computer);
    }
  };

  const computerMove = useCallback(() => {
    let index = generateRandomInt(0, 8);
    while (grid[index]) {
      index = generateRandomInt(0, 8);
    }
    move(index, players.computer);
    setNextMove(players.person);
  }, [move, grid, players]);

  const choosePlayer = (option: number) => {
    setPlayers({ person: option, computer: switchPlayer(option) });
    setGameState(GAME_STATES.inProgress);
    setNextMove(PLAYER_X);
  };

  const startNewGame = () => {
    setGameState(GAME_STATES.notStartedYet);
    setGrid(emptyGrid);
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (
      nextMove !== null &&
      nextMove === players.computer &&
      gameState !== GAME_STATES.gameOver
    ) {
      timeout = setTimeout(() => {
        computerMove();
      }, 800);
    }
    return () => timeout && clearTimeout(timeout);
  }, [nextMove, computerMove, players.computer, gameState]);

  useEffect(() => {
    const boardWinner = board.calculateWinner(grid);
    const declareWinner = (winner: number) => {
      let winnerStr = "";
      switch (winner) {
        case PLAYER_X:
          winnerStr = "X wins!";
          break;
        case PLAYER_O:
          winnerStr = "O wins!";
          break;
        case DRAW:
        default:
          winnerStr = "Draw";
      }
      setGameState(GAME_STATES.gameOver);
      setWinner(winnerStr);
    };

    if (boardWinner !== null && gameState !== GAME_STATES.gameOver) {
      declareWinner(boardWinner);
    }
  }, [gameState, grid, nextMove]);

  switch (gameState) {
    case GAME_STATES.notStartedYet:
    default:
      return (
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
      );
    case GAME_STATES.inProgress:
      return (
        <Container dims={DIMENSIONS}>
          {grid.map((value, index) => {
            const isActive = value !== null;
  
            return (
              <Square
                key={index}
                onClick={() => personMove(index)}
              >
                {isActive && <Marker>{value === PLAYER_X ? "X" : "O"}</Marker>}
              </Square>
            );
          })}
        </Container>
      );
    case GAME_STATES.gameOver:
      return (
        <div>
          <p>{winner}</p>
          <button onClick={startNewGame}>Start over</button>
        </div>
      );
  }
}
