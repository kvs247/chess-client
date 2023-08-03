import { ParsedFEN } from "./types";

export const isNumeric = (text: string): boolean => {
  return Number(text) === Number(parseFloat(text));
};

export const parseFEN = (fen: string): ParsedFEN => {
  const [
    piecePlacement,
    activeColor,
    castlingRights,
    enPassantTarget,
    halfmoveClock,
    fullmoveClock,
  ] = fen.split(" ");
  return {
    piecePlacement,
    activeColor,
    castlingRights,
    enPassantTarget,
    halfmoveClock,
    fullmoveClock,
  };
};

export const fenToPieceArray = (fen: string): Array<string | null> => {
  const parsedFEN = parseFEN(fen);
  const pieceArray = parsedFEN.piecePlacement
    .split("")
    .filter(char => char !== "/")
    .map((char) => {
      if (isNumeric(char)) {
        const num = parseInt(char);
        return Array(num).fill(null);
      }
      return char;
    }).flat();  

  return pieceArray;
};
