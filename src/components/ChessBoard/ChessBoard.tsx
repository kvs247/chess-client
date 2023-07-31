import { FC } from "react";
import { fenToPiecesArray } from "../../helpers/fenHelper/fenHelper";
import piecePngs from "../../helpers/piecePngs";
import styles from "./styles.module.scss";

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

    const backgroundColor = (
      (((row % 2 === 0) && (i % 2 === 0)) ||
        ((row % 2 === 1) && (i % 2) === 1)) 
          ? lightSquare : darkSquare
    );

    const pieceType = piecesArray[i];
    const png = piecePngs[pieceType] ?? "";

    squares.push(
      <div
        key={ i }
        className={ styles.Square }
        style={{ backgroundColor }}
      >
        <img 
          alt=""
          src={ png } 
          className={ styles.PieceImg } 
        />
      </div>
    );

  }

  return (
    <div className={styles.Wrapper}>
      {squares}
    </div>
  );
};

export default ChessBoard;