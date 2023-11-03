import { FC, useState, useEffect } from "react";
import { Button } from "antd";
import { gamesApi } from "../../store/games/api";
import ChessBoard from "../../components/ChessBoard/ChessBoard";
import styles from "./styles.module.scss";

const startingFEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

const GAME_ID = "0";

const Home: FC = () => {
  const [triggerGetGameById, getGameByIdResult] = gamesApi.endpoints.getGameById.useLazyQuery();
  const [triggerResetGameById] = gamesApi.endpoints.resetGameById.useMutation();
  const fen = getGameByIdResult?.data?.game.fen ?? "";

  useEffect(() => {
    const fetchGame = async (): Promise<void> => {
      await triggerGetGameById(GAME_ID);
    };
    fetchGame().catch((error) => {
      console.log("error while getting game data:\n", error);
    });
  });

  return (
    <div className={styles.Wrapper}>
      <Button 
        className={styles.Button}
        onClick={() => triggerResetGameById(GAME_ID)}
      >
        reset
      </Button>
      <div className={styles.ChessBoardWrapper}>
        {fen === "" ? null : <ChessBoard fen={fen} />}
        {/* <ChessBoard fen={fen} /> */}
      </div>
    </div>
  );
};

export default Home;