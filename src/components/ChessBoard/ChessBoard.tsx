import { FC, useState, useEffect, Dispatch, SetStateAction } from "react";
import Draggable from "react-draggable";
import { moveApi } from "../../store/move/api";
import { fenToPieceArray } from "../../helpers/fenHelper/fenHelper";
import piecePngs from "../../helpers/piecePngs";
import styles from "./styles.module.scss";
import startingFEN from "../../startingFEN";

const lightSquare = "white";

interface ChessBoardParams {
  fen: string;
  setFen: Dispatch<SetStateAction<string>>;
  boardColor: string;
}

const positionsInitialState = {};
for (let i = 0; i < 64; i++) {
  positionsInitialState[i] = { x: 0, y: 0 };
}

const ChessBoard: FC<ChessBoardParams> = ({ fen, setFen, boardColor }) => {
  const piecesArray = fenToPieceArray(fen);
  const [positions, setPositions] = useState(positionsInitialState);
  const [triggerProcessMove, triggerProcessMoveResponse] =
    moveApi.endpoints.processMove.useMutation();

  // Create squares
  const squareLength = (window.innerHeight * (90 / 100)) / 8;
  const squares = [];
  for (let i = 0; i < 64; i++) {
    const row = Math.floor(i / 8);

    const backgroundColor = (
      (((row % 2 === 0) && (i % 2 === 0)) ||
        ((row % 2 === 1) && (i % 2) === 1))
        ? lightSquare : boardColor
    );

    const pieceType = piecesArray[i];
    const png = piecePngs[pieceType] ?? "";

    const onStartDrag = (): void => {
      setPositions(positionsInitialState);
    };

    // @ts-ignore
    const onStopDrag = async (i: number): any => {
      const deltaX = positions[i].x;
      const deltaY = positions[i].y;

      const fromIndex = i;
      const toIndex = i + Math.round(deltaX / squareLength) + (8 * Math.round(deltaY / squareLength));

      const payload = {
        fen,
        fromIndex,
        toIndex,
      };
      const response: any = await triggerProcessMove(payload);
      const newFen = response.data.newFen;
      if (newFen === fen) {
        setPositions((positions) => {
          const newPositions = { ...positions };
          newPositions[i] = { x: 0, y: 0 };
          return newPositions;
        });
      }
      setFen(newFen);
    };

    const handleDrag = (e: any, ui: any, i: number): void => {
      const { x, y } = positions[i];
      const newPositions = { ...positions };
      newPositions[i] = { x: x + ui.deltaX, y: y + ui.deltaY };
      setPositions(newPositions);
    };

    const setCursorToGrab = (): void => {
      document.body.style.cursor = "grab";
    };

    const setCursorToGrabbing = (): void => {
      document.body.style.cursor = "grabbing";
    };

    squares.push(
      <div
        key={i}
        className={styles.Square}
        style={{ backgroundColor }}
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
            onMouseDown={setCursorToGrabbing}
            onMouseUp={setCursorToGrab}
          />
        </Draggable>
      </div>
    );

  }

  useEffect(() => {
    if (triggerProcessMoveResponse.data?.newFen) {
      setFen(triggerProcessMoveResponse.data.newFen);
    }
  }, [triggerProcessMoveResponse]);

  useEffect(() => {
    if (fen === startingFEN) {
      setPositions(positionsInitialState);
    }
  }, [fen]);

  return (
    <div id="board-wrapper" className={styles.Wrapper}>
      {squares}
    </div>
  );
};

export default ChessBoard;