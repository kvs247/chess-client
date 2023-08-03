import { FC, useState, useEffect } from "react";
import Draggable from "react-draggable";
import { moveApi } from "../../store/move/api";
import { fenToPieceArray } from "../../helpers/fenHelper/fenHelper";
import piecePngs from "../../helpers/piecePngs";
import styles from "./styles.module.scss";
import startingFEN from "../../startingFEN";

const lightSquare = "white";
const darkSquare = "green";

interface ChessBoardParams {
  fen: string;
}

const positionsInitialState = {};
for (let i = 0; i < 64; i++) {
  positionsInitialState[i] = { x: 0, y: 0 };
}

const  ChessBoard: FC<ChessBoardParams> = ({ fen }) => {
  const [currentFen, setCurrentFen] = useState(fen);
  const piecesArray = fenToPieceArray(currentFen);
  const [positions, setPositions] = useState(positionsInitialState);
  const [triggerProcessMove, triggerProcessMoveResponse] = moveApi.endpoints.processMove.useMutation();

  // Create squares
  const squareLength = (window.innerHeight * (90 / 100)) / 8;
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

    const getNewFEN = async (fen: string, fromIndex: number, toIndex: number): Promise<string> => {
      console.log(fromIndex, toIndex)
      const processMoveResult: any = await triggerProcessMove({ fen, fromIndex, toIndex, });
      return processMoveResult?.response ?? "";
    };

    const onStartDrag = (): void => {
      setPositions(positionsInitialState);
    };

    // @ts-ignore
    const onStopDrag = async (i: number): any => {
      const deltaX = positions[i].x;
      const deltaY = positions[i].y;

      let fromIndex = i;
      let toIndex = i + Math.round(deltaX / squareLength) + (8 * Math.round(deltaY / squareLength));

      await getNewFEN(startingFEN, fromIndex, toIndex);

      // illegal move
      // const newPositions = { ...positions };
      // newPositions[i] = { x: 0, y: 0 };
      // setPositions(newPositions);
    };

    const handleDrag = (e: any, ui: any, i: number): void => {
      const { x, y } = positions[i];
      const newPositions = { ...positions };
      newPositions[i] = { x: x + ui.deltaX, y: y + ui.deltaY };
      setPositions(newPositions);
    };

    squares.push(
      <div
        key={i}
        className={styles.Square}
        style={{backgroundColor}}
      >
        <Draggable
          bounds="#board-wrapper"
          onStart={onStartDrag}
          onStop={() => onStopDrag(i)}
          onDrag={(e, ui) => handleDrag(e, ui, i)}
          position={positions[i]}
        >
          <img 
            alt=""
            draggable="false"
            src={png} 
            className={styles.PieceImg} 
          />
        </Draggable>
      </div>
    );

  }

  useEffect(() => {
    setPositions(positionsInitialState);
  }, []);

  useEffect(() => {
    if (triggerProcessMoveResponse.data?.response) {
      setCurrentFen(triggerProcessMoveResponse.data.response);
    }
  }, [triggerProcessMoveResponse]);

  return (
    <div id="board-wrapper" className={styles.Wrapper}>
      {squares}
    </div>
  );
};

export default ChessBoard;