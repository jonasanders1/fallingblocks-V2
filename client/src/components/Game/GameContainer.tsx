import GameHeader from "./GameHeader/GameHeader";
import Gameboard from "./Gameboard/Gameboard";
import PieceOnHold from "./PieceOnHold/PieceOnHold";
import GameStats from "./GameStats/GameStats";
import NextPieces from "./NextPieces/NextPieces";
const GameContainer = () => {
  return (
    <>
      <GameHeader />
      <PieceOnHold />
      <GameStats />
      <Gameboard />
      <NextPieces />
    </>
  );
};

export default GameContainer