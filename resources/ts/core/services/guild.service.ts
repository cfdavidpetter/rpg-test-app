import { requests } from "@/shared/lib/requests";
import { apiEndpoint } from "../constants/sys";
import { PaginatedResponse } from "../models/sys.mode";
import { IGuild } from "../models/guild.mode";

export class GuildService {
  list(): Promise<PaginatedResponse<IGuild>> {
    return requests
      .get(`${apiEndpoint.Guilds}`)
      .then((r: any) => {
        return r;
      });
  }

  get(id: number) {
    return requests
      .get(`${apiEndpoint.Guilds}/${id}`)
      .then((r: any) => {
        return r;
      });
  }

  store(data: IGuild) {
    return requests
      .post(`${apiEndpoint.Guilds}`, data)
      .then((r: any) => {
        return r;
      });
  }

  update(id: number, data: IGuild) {
    return requests
      .put(`${apiEndpoint.Guilds}/${id}`, data)
      .then((r: any) => {
        return r;
      });
  }

  destroy(id: number) {
    return requests
      .delete(`${apiEndpoint.Guilds}/${id}`)
      .then((r: any) => {
        return r;
      });
  }
}