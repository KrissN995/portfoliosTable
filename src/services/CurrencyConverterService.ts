import {RestService} from './RestService';
import {ExchangeRate} from "../models/currencyModels";

export class CurrencyConverterService extends RestService {
    private _baseUrl = 'https://anyapi.io/api/v1/exchange/rates';
    private _apiKey = 'hpii5vb1qncants6bpu0o0fd8bnh03qhhl97mhvu5b150nbvkmig';

    /**
     * Gets the exchange rates from a third party API based on base currency
     * @param baseCurrency
     * @return ExchangeRate
     */
    public async getExchangeRates(baseCurrency: string): Promise<ExchangeRate> {
        return this.fetchData(`${this._baseUrl}?base=${baseCurrency}&apiKey=${this._apiKey}`).then((res) => {
            return res.data;
        }).catch((err) => {
            console.log(err);
            return err;
        });
    }

    /**
     * Gets the mock exchange rates data that is in a json file in the public folder
     * @return ExchangeRate[]
     */
    public async getMockExchangeData(): Promise<ExchangeRate> {
        return this.fetchData('./exchangeRateMockData.json').then((res) => {
            return res.data;
        }).catch((err) => {
            console.log(err);
            return err;
        });
    }

}

