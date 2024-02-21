import { FC, useState, useEffect } from "react";
import { Button } from "antd";
import { gamesApi } from "../../store/games/api";
import ChessBoard from "../../components/ChessBoard/ChessBoard";
import styles from "./styles.module.scss";
import { useGetGameByIdQuery } from "../../store/games/api";

import { CirclePicker } from "react-color";

const startingFEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

const GAME_ID = "0";

const Home: FC = () => {
  const { data, isLoading } = useGetGameByIdQuery(GAME_ID);
  const [fen, setFen] = useState(data?.game?.fen ?? "");
  const [boardColor, setBoardColor] = useState("#683cb4");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [triggerResetGameById] = gamesApi.endpoints.resetGameById.useMutation();

  const onClickReset = (): void => {
    triggerResetGameById(GAME_ID);
    setFen(startingFEN);
  };

  const onChangeColor = (newColor: string) => {
    setBoardColor(newColor);
  };

  useEffect(() => {
    setFen(data?.game?.fen ?? "");
  }, [isLoading]);

  return (
    <div className={styles.Wrapper}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyItems: "space-between",
        }}
      >
        <div>
          <Button
            className={styles.Button}
            onClick={onClickReset}
          >
            Reset
          </Button>
        </div>
        <div style={{ bottom: 0, position: "absolute" }}>
          {showColorPicker ? (
            <div className={styles.ColorPickerWrapper}>
              <CirclePicker
                onChange={(color) => onChangeColor(color.hex)}
              />
            </div>
          ) : null}
          <Button
            style={{ margin: "10px" }}
            onClick={() => setShowColorPicker(!showColorPicker)}
          >
            {showColorPicker ? "Hide" : "Change Board Color"}
          </Button>
        </div>
      </div>
      <div className={styles.ChessBoardWrapper}>
        {fen === "" ? null : <ChessBoard fen={fen} setFen={setFen} boardColor={boardColor} />}
      </div>
    </div>
  );
};

export default Home;