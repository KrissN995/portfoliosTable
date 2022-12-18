import {RestService} from './RestService';
import {ExchangeRate} from "../models/currencyModels";

export class CurrencyConverterService extends RestService {
    private _baseUrl = 'https://anyapi.io/api/v1/exchange/rates';
    private _apiKey='hpii5vb1qncants6bpu0o0fd8bnh03qhhl97mhvu5b150nbvkmig';
    //hpii5vb1qncants6bpu0o0fd8bnh03qhhl97mhvu5b150nbvkmig
//'https://api.exchangeratesapi.io/v1/' + endpoint + '?access_key=' + access_key
    //https://openexchangerates.org/api/latest.json?app_id=Required&base=Optional&symbols=Optional&prettyprint=false&show_alternative=false
    /**
     * Gets the exchange rates from a third party API based on base currency
     * @param baseCurrency
     * @return ExchangeRate
     */
    public async getExchangeRates(baseCurrency:string): Promise<ExchangeRate> {
        return this.fetchData(`${this._baseUrl}?base=${baseCurrency}&apiKey=${this._apiKey}`).then((res) => {
            return res.data;
        }).catch((err) => {
            console.log(err);
            return err;
        });
    }

}

