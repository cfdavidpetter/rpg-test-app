import { IPlayer } from "./player.mode";
import { PaginatedResponse } from "./sys.mode";

export interface IChoosePlayers {
  confirmedIds: number[];
  players: PaginatedResponse<IPlayer>,
}