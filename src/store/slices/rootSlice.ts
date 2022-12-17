import appReducer from './appSlice';
import clientReducer from './clientSlice';
import {combineReducers} from '@reduxjs/toolkit';

const rootSlice = combineReducers({
    app: appReducer,
    client: clientReducer
});

export type RootState = ReturnType<typeof rootSlice>;

export default rootSlice;
