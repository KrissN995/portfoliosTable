import currencySliceReducer, {
    CurrencyState,
    setExchangeRates
} from "../../../store/slices/currencySlice";

const initialState: CurrencyState = {};

describe('Currency_Reducer', () => {
    it('setExchangeRates', () => {
        const currencyExchangeRated: any = {
            lastUpdate: '1671494400',
            base: "EUR",
            rates: {
                EUR: 1,
                USD: 1.0599,
                JPY: 140.58,
                BGN: 1.9558,
                CZK: 24.181,
                DKK: 7.4388,
                GBP: 0.8753,
                HUF: 403.88,
                PLN: 4.6757,
                RON: 4.9125,
                SEK: 11.0615,
                CHF: 0.9854,
                ISK: 151.5,
                NOK: 10.5098,
                HRK: 7.5471,
                TRY: 19.7744,
                AUD: 1.5972,
                BRL: 5.6234,
                CAD: 1.4451,
                CNY: 7.39,
                HKD: 8.2488,
                IDR: 16537.09,
                ILS: 3.6759,
                INR: 87.6649,
                KRW: 1363.73,
                MXN: 20.9355,
                MYR: 4.6991,
                NZD: 1.6816,
                PHP: 58.549,
                SGD: 1.4347,
                THB: 36.853,
                ZAR: 18.4239
            }
        };
        const action = setExchangeRates(currencyExchangeRated);
        const result = currencySliceReducer(initialState, action);
        expect(result.exchangeRates).toEqual(currencyExchangeRated);
    });

});