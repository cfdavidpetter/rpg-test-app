import { requests } from "@/shared/lib/requests";
import { apiEndpoint } from "../constants/sys";
import { IChoosePlayers } from "../models/Session.mode";

export class SessionService {
  getPlayersToAddToSession(page: string = '1'): Promise<IChoosePlayers> {
    return requests
      .get(`${apiEndpoint.Session}/players?&page=${page}`)
      .then((r: any) => {
        return r;
      });
  }

  setAllPlayersAsUnconfirmed() {
    return requests
      .post(`${apiEndpoint.Session}/players/clear`, {})
      .then((r: any) => {
        return r;
      });
  }

  setPlayersAsConfirmed(body: { ids: number[] }) {
    return requests
      .post(`${apiEndpoint.Session}/players/add`, body)
      .then((r: any) => {
        return r;
      });
  }

  getGuilds() {
    return requests
      .get(`${apiEndpoint.Session}/guilds`)
      .then((r: any) => {
        return r;
      });
  }
}