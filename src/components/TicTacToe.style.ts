import styled from "styled-components";
import { SQUARE_SIZE } from "../constants/constants";

export const Container = styled.div<{ dims: number }>`
  display: flex;
  justify-content: center;
  width: ${({ dims }) => `${dims * (SQUARE_SIZE + 5)}px`};
  flex-flow: wrap;
  position: relative;
`;

export const Square = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${SQUARE_SIZE}px;
  height: ${SQUARE_SIZE}px;
  border: 2px solid;
  border-color: #0080FF;

  &:hover {
    cursor: pointer;
  }
`;

export const Marker = styled.p`
  font-size: 68px;
`;