import { FC } from "react";
import ChessBoard from "../../components/ChessBoard/ChessBoard";
import styles from "./styles.module.scss";

const startingFEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

const Home: FC = () => {

  return (
    <div className={styles.Wrapper}>
      <div className={styles.ChessBoardWrapper}>
        <ChessBoard fen={startingFEN} />
      </div>
    </div>
  );
};

export default Home;