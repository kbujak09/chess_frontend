export type pieceDataType = {
  color: string,
  type: string,
  position: number[],
  possible_moves: number[][]
}

type PlayerType = {
  id: string | null,
  username: string | null,
  time: number | null
};

export type PlayersType = {
  white: PlayerType,
  black: PlayerType
}