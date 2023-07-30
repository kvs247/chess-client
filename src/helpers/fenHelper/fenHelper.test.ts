import startingFEN from "../../startingFEN";
import { isNumeric, parseFEN, fenToPiecesArray } from "./fenHelper";


test("isNumeric", () => {
  expect(isNumeric("e")).toEqual(false);
  expect(isNumeric("1")).toEqual(true);
  expect(isNumeric("231241")).toEqual(true);
  expect(isNumeric("1hnb341b")).toEqual(false);
  expect(isNumeric("$^ @%&$H&B$")).toEqual(false);
});

test("parseFEN", () => {
  const startingParsedFEN = {
    piecePlacement: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR",
    activeColor: "w",
    castlingRights: "KQkq",
    enPassantTarget: "-",
    halfmoveClock: "0",
    fullmoveClock: "1",
  };
  expect(parseFEN(startingFEN)).toEqual(startingParsedFEN);
});

test("fenToPiecesArray", () => {
  const startingPiecesArray = [
    "r", "n", "b", "q", "k", "b", "n", "r",
    Array(8).fill("p"),
    Array(32).fill(null),
    Array(8).fill("P"),
    "R", "N", "B", "Q", "K", "B", "N", "R",
  ].flat();
  expect(fenToPiecesArray(startingFEN)).toEqual(startingPiecesArray);
});