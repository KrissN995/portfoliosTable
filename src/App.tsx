import React, {useEffect, useState} from 'react';
import './App.css';
import {darkTheme, lightTheme} from "./theme/theme";
import {useSelector} from "react-redux";
import {RootState} from "./store/slices/rootSlice";
import {Theme, ThemeProvider} from "@mui/material";
import MainPage from "./pages/MainPage";

const App = () => {
    const {isDarkTheme} = useSelector((state: RootState) => state.app);
    const [localTheme, setLocalTheme] = useState<Theme>(lightTheme)

    useEffect(() => {
        setLocalTheme(isDarkTheme ? darkTheme : lightTheme);
    }, [isDarkTheme])

    return (<>
        <ThemeProvider theme={localTheme ?? (isDarkTheme ? darkTheme : lightTheme)}>
            <MainPage/>
        </ThemeProvider>
    </>);
}

export default App;
