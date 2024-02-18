import { FC, useState, useEffect } from "react";
import { Button } from "antd";
import { gamesApi } from "../../store/games/api";
import ChessBoard from "../../components/ChessBoard/ChessBoard";
import styles from "./styles.module.scss";
import { useGetGameByIdQuery } from "../../store/games/api";

const startingFEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

const GAME_ID = "0";

const Home: FC = () => {
  const { data, isLoading } = useGetGameByIdQuery(GAME_ID);
  const [fen, setFen] = useState(data?.game?.fen ?? "");
  const [triggerResetGameById] = gamesApi.endpoints.resetGameById.useMutation();

  const onClickReset = (): void => {
    triggerResetGameById(GAME_ID);
    setFen(startingFEN);
  };

  useEffect(() => {
    setFen(data?.game?.fen ?? "");
  }, [isLoading]);

  return (
    <div className={styles.Wrapper}>
      <Button
        className={styles.Button}
        onClick={onClickReset}
      >
        reset
      </Button>
      <div className={styles.ChessBoardWrapper}>
        {fen === "" ? null : <ChessBoard fen={fen} setFen={setFen} />}
      </div>
    </div>
  );
};

export default Home;