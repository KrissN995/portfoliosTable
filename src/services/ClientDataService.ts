import {RestService} from './RestService';


export class ClientDataService extends RestService {
    private _baseUrl = './data.json';

    public async getClientData(): Promise<any[]> {
        return this.fetchData(this._baseUrl).then((res) => {
            return res.data;
        }).catch((err) => {
            console.log(err);
            return err;
        });
    }

}

