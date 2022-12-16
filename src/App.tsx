import React, {useEffect, useState} from 'react';
import './App.css';
import {darkTheme, lightTheme} from "./theme/theme";
import {useSelector} from "react-redux";
import {RootState} from "./store/slices/rootSlice";
import {Theme, ThemeProvider} from "@mui/material";
import MainPage from "./pages/MainPage";
import FadeIn from "react-fade-in";

const App = () => {
    const {isDarkTheme} = useSelector((state: RootState) => state.app);
    const [localTheme, setLocalTheme] = useState<Theme>(lightTheme)

    useEffect(() => {
        setLocalTheme(isDarkTheme ? darkTheme : lightTheme);
    }, [isDarkTheme])

    return (<>
        <ThemeProvider theme={localTheme ?? (isDarkTheme ? darkTheme : lightTheme)}>
            <FadeIn>
                <MainPage/>
            </FadeIn>
        </ThemeProvider>
    </>);
}

export default App;
