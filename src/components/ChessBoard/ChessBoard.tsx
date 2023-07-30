import { FC } from "react";
import { fenToPiecesArray } from "../../helpers/fenHelper";

const lightSquare = "white";
const darkSquare = "green";

interface ChessBoardParams {
  fen: string;
}

const ChessBoard: FC<ChessBoardParams> = ({ fen }) => {
  const piecesArray = fenToPiecesArray(fen);

  // Create squares
  const squares = [];
  for (let i = 0; i < 64; i++) {
    const row = Math.floor(i / 8);
    const color = (
      (((row % 2 === 0) && (i % 2 === 0)) ||
        ((row % 2 === 1) && (i % 2) === 1)) 
          ? lightSquare : darkSquare
    );

    squares.push(
      <div
        key={i}
        style={{
          backgroundColor: color,
          height: "100%",
          width: "100%",
        }}
      >
        {piecesArray[i] ?? ""}
      </div>
    );

  }

  return (
    <div
      style={{
        backgroundColor: "red",
        width: "calc(min(90vh, 90vw))",
        height: "calc(min(90vh, 90vw))",
        display: "grid",
        gridTemplateColumns: "repeat(8, 1fr)",
        // gridTemplateRows: "repeat(8, 1fr)",
        // position: "relative",
      }}
    >
      {squares}
    </div>
  );
};

export default ChessBoard;