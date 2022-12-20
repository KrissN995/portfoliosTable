import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface MainState {
    drawerOpen: boolean;
    isDarkTheme: boolean;
    topBarTitle:string;
}

const initialState: MainState = {
    drawerOpen: false,
    isDarkTheme: true,
    topBarTitle:''
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
        /**
         * Set's the title that is displayed in the topBar
         * @param state
         * @param action
         */
        setTopBarTitle(state, action: PayloadAction<string>) {
            state.topBarTitle = action.payload;
        },
    }
});

export const {
    setIsDarkTheme,
    setIsDrawerOpen,
    setTopBarTitle
} = appSlice.actions;

export default appSlice.reducer;