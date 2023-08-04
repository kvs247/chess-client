export interface MoveRequest {
  fen: string;
  fromIndex: number;
  toIndex: number;
}

export interface MoveResponse {
  newFen: string;
}