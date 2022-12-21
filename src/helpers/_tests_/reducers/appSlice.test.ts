import appSliceReducer, {
    MainState,
    setIsDarkTheme,
    setTopBarTitle,
    setIsDrawerOpen
} from "../../../store/slices/appSlice";

const initialState: MainState = {
    isDarkTheme: true,
    drawerOpen: false,
    topBarTitle: ''
};

describe('App_Reducer', () => {
    it('setTopBarTitle', () => {
        const appTopBarTitle: string = 'Customers portfolios';
        const action = setTopBarTitle(appTopBarTitle);
        const result = appSliceReducer(initialState, action);
        expect(result.topBarTitle).toEqual(appTopBarTitle);
    });
    it('setIsDarkTheme', () => {
        const appIsDarkTheme: boolean = false;
        const action = setIsDarkTheme(appIsDarkTheme);
        const result = appSliceReducer(initialState, action);
        expect(result.isDarkTheme).toEqual(appIsDarkTheme);
    });
    it('setIsDrawerOpen', () => {
        const appDrawerOpen: boolean = true;
        const action = setIsDrawerOpen(appDrawerOpen);
        const result = appSliceReducer(initialState, action);
        expect(result.drawerOpen).toEqual(appDrawerOpen);
    });
});