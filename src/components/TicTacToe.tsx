import { useState } from "react";
import { DIMENSIONS } from "../constants/constants";
import { Container, Square } from "./TicTacToe.style";

const emptyGrid = new Array(DIMENSIONS ** 2).fill(null);

export default function TicTacToe() {
  const [grid, setGrid] = useState(emptyGrid);

  return (
    <Container dims={DIMENSIONS}>
      {grid.map((value, index) => {
        const isActive = value !== null;

        return <Square key={index}></Square>;
      })}
    </Container>
  );
}
