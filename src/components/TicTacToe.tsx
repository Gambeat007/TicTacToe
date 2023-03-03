import { useState } from "react";
import { DIMENSIONS, PLAYER_O, PLAYER_X } from "../constants/constants";
import { generateRandomInt } from "../utils/utils";
import { Container, Square, Marker } from "./TicTacToe.style";

const emptyGrid = new Array(DIMENSIONS ** 2).fill(null);

export default function TicTacToe() {
  const [grid, setGrid] = useState(emptyGrid);
  const [players, setPlayers] = useState({
    person: PLAYER_X,
    computer: PLAYER_O,
  });

  const move = (index: number, player: number) => {
    setGrid((grid) => {
      const gridCopy = grid.concat();
      gridCopy[index] = player;
      return gridCopy;
    });
  };

  const aiMove = () => {
    let index = generateRandomInt(0, 8);
    while (grid[index]) {
      index = generateRandomInt(0, 8);
    }
    move(index, players.computer);
  };

  const humanMove = (index: number) => {
    if (!grid[index]) {
      move(index, players.person);
      aiMove();
    }
  };

  return (
    <Container dims={DIMENSIONS}>
      {grid.map((value, index) => {
        const isActive = value !== null;

        return (
          <Square key={index} onClick={() => humanMove(index)}>
            {isActive && <Marker>{value === PLAYER_X ? "X" : "O"}</Marker>}
          </Square>
        );
      })}
    </Container>
  );
}
