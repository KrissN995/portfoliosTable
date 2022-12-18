import {RestService} from './RestService';
import {Client} from "../models/appModels";


export class ClientDataService extends RestService {
    private _baseUrl = './data.json';

    public async getClientData(): Promise<Client[]> {
        return this.fetchData(this._baseUrl).then((res) => {
            return res.data;
        }).catch((err) => {
            console.log(err);
            return err;
        });
    }

}

