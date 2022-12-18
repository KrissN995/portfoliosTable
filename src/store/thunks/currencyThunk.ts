import {setErrorMessage} from "../slices/clientSlice";
import {CurrencyConverterService} from "../../services/CurrencyConverterService";
import {setExchangeRates} from "../slices/currencySlice";

/**
 * Fetch exchange rates based on base currency
 * @param baseCurrency
 */
export const fetchCurrencyExchangeRates: any = (baseCurrency:string) => async (dispatch: any) => {
    try {
        const currencyService = new CurrencyConverterService();
        const exchangeRates = await currencyService.getExchangeRates(baseCurrency);
        dispatch(setExchangeRates(exchangeRates));
    } catch (error:any) {
        dispatch(setErrorMessage(error));
    }
};