import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import {Grid, Theme} from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import Topbar from "../components/shared/Topbar";
import MainComponent from "../components/main/MainComponent";
import {ClientAdditionalInfoDialog} from "../components/main/ClientAdditionalInfoDialog";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        height: '100vh',
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flex: 1,
    },
    pageArea: {
        flex: 1,
        overflow: 'auto',
        padding: theme.spacing(1)
    },
}));

const MainPage = () => {
    const classes = useStyles();

    return (<div className={classes.root}>
        <CssBaseline/>
        <Topbar/>
        <Grid container direction='column' className={classes.content}>
            <Grid className={classes.appBarSpacer}/>
            <Grid container className={classes.pageArea}>
                <MainComponent/>
            </Grid>
            <ClientAdditionalInfoDialog/>
        </Grid>
    </div>);

};

export default MainPage;
