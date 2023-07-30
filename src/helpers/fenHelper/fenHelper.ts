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

export const fenToPiecesArray = (fen: string): string[] => {
  const parsedFEN = parseFEN(fen);
  const piecesArray = parsedFEN.piecePlacement
    .split("")
    .filter(char => char !== "/")
    .map((char) => {
      if (isNumeric(char)) {
        const num = parseInt(char);
        return Array(num).fill(null);
      }
      return char;
    }).flat();  

  return piecesArray;
};