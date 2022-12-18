import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface CurrencyState {
    exchangeRates?: any;
}

const initialState: CurrencyState = {};

const currencySlice = createSlice({
    name: 'currency',
    initialState,
    reducers: {
        /**
         * Set's the exchange rates based on the base currency
         * @param state
         * @param action
         */
        setExchangeRates(state, action: PayloadAction<any>) {
            state.exchangeRates = action.payload;
        },
    }
});

export const {
    setExchangeRates,
} = currencySlice.actions;

export default currencySlice.reducer;