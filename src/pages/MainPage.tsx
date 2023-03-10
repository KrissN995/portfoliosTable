import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import {Grid, Theme} from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import {RoutesSwitch} from "../router/Routes";
import {useAppDispatch} from "../store/store";
import {useSelector} from "react-redux";
import {RootState} from "../store/slices/rootSlice";
import {setIsDrawerOpen} from "../store/slices/appSlice";
import Sidebar from "../components/main/Sidebar";
import {Topbar} from "../components/main/Topbar";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        height: '100vh',
    },
    content: {
        flex: 1,
    },
    appBarSpacer: theme.mixins.toolbar,
    pageArea: {
        flex: 1,
        overflow: 'auto',
        padding: theme.spacing(1)
    },
}));

const MainPage = () => {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const {
        drawerOpen,
    } = useSelector((state: RootState) => state.app);

    return (<div className={classes.root}>
        <CssBaseline/>
        <div onBlur={() => drawerOpen ? dispatch(setIsDrawerOpen(!drawerOpen)) : null}>
            <Topbar/>
            <Sidebar/>
        </div>
        <Grid container direction="column" className={classes.content}>
            <Grid className={classes.appBarSpacer}/>
            <Grid container className={classes.pageArea}>
                <RoutesSwitch/>
            </Grid>
        </Grid>
    </div>);

};

export default MainPage;
