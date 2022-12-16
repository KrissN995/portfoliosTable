import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface MainState {
    drawerOpen: boolean;
    isDarkTheme: boolean;
}

const initialState: MainState = {
    drawerOpen: false,
    isDarkTheme: true,
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        /**
         * Set's the theme of the application. If true is dark theme if false is light theme
         * @param state
         * @param action
         */
        setIsDarkTheme(state, action: PayloadAction<boolean>) {
            state.isDarkTheme = action.payload;
        },
        /**
         * Set's if the drawer is open
         * @param state
         * @param action
         */
        setIsDrawerOpen(state, action: PayloadAction<boolean>) {
            state.drawerOpen = action.payload;
        },
    }
});

export const {
    setIsDarkTheme,
    setIsDrawerOpen
} = appSlice.actions;

export default appSlice.reducer;