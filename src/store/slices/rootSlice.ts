import appReducer from './appSlice';
import {combineReducers} from '@reduxjs/toolkit';

const rootSlice = combineReducers({
    app: appReducer,
});

export type RootState = ReturnType<typeof rootSlice>;

export default rootSlice;
