import { requests } from "@/shared/lib/requests";
import { apiEndpoint } from "../constants/sys";
import { PaginatedResponse } from "../models/sys.mode";
import { IPlayer } from "../models/player.mode";

export class PlayerService {
  list(page: string = '1'): Promise<PaginatedResponse<IPlayer>> {
    return requests
      .get(`${apiEndpoint.Players}?&page=${page}`)
      .then((r: any) => {
        return r;
      });
  }

  get(id: number) {
    return requests
      .get(`${apiEndpoint.Players}/${id}`)
      .then((r: any) => {
        return r;
      });
  }

  store(data: IPlayer) {
    return requests
      .post(`${apiEndpoint.Players}`, data)
      .then((r: any) => {
        return r;
      });
  }

  update(id: number, data: IPlayer) {
    return requests
      .put(`${apiEndpoint.Players}/${id}`, data)
      .then((r: any) => {
        return r;
      });
  }

  destroy(id: number) {
    return requests
      .delete(`${apiEndpoint.Players}/${id}`)
      .then((r: any) => {
        return r;
      });
  }
}