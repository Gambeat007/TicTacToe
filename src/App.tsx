import "papercss/dist/paper.min.css";
import TicTacToe from "./components/TicTacToe";
import { MainContainer } from "./global.styles";

export default function App() {
  return (
    <MainContainer>
      <TicTacToe />
      </MainContainer>
  );
}
