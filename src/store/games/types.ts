interface Game {
  gameId: string;
  fen: string;
}

export interface GetGameResponse {
  game: Game;
}