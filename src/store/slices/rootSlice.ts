import appReducer from './appSlice';
import clientReducer from './clientSlice';
import currencyreducer from './currencySlice';
import {combineReducers} from '@reduxjs/toolkit';

const rootSlice = combineReducers({
    app: appReducer,
    client: clientReducer,
    currency: currencyreducer
});

export type RootState = ReturnType<typeof rootSlice>;

export default rootSlice;
