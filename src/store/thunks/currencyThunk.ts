import {setErrorMessage} from "../slices/clientSlice";
import {CurrencyConverterService} from "../../services/CurrencyConverterService";
import {setExchangeRates} from "../slices/currencySlice";

/**
 * Fetch exchange rates based on base currency
 * @param baseCurrency
 */
export const fetchCurrencyExchangeRates: any = (baseCurrency: string) => async (dispatch: any) => {
    const currencyService = new CurrencyConverterService();
    try {
        const exchangeRates = await currencyService.getExchangeRates(baseCurrency);
        if(exchangeRates){
            dispatch(setExchangeRates(exchangeRates));
        } else{
            try {
                const exchangeRates = await currencyService.getMockExchangeData();
                dispatch(setExchangeRates(exchangeRates));
            } catch (innerError: any) {
                dispatch(setErrorMessage(innerError));
            }
        }
    } catch (error: any) {
        try {
            const exchangeRates = await currencyService.getMockExchangeData();
            dispatch(setExchangeRates(exchangeRates));
        } catch (innerError: any) {
            dispatch(setErrorMessage(innerError));
        }
    }
};