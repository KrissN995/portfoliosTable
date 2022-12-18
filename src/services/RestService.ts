import axios, {AxiosResponse} from 'axios';

export abstract class RestService {

    /**
     * Abstract method to fetch data from api's
     * @param subPath
     * @param params
     * @protected
     */
    protected async fetchData(subPath: string, params: any = undefined): Promise<AxiosResponse> {
        const path = `${subPath}`;
        try {
            return await axios.get(path, params);
        } catch (err: any) {
            console.log(err.message);
            return err.message;
        }
    }
}