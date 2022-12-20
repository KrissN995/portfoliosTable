import React, {useEffect} from 'react';
import {Grid, Theme} from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import MainComponent from "../components/main/MainComponent";
import {ClientAdditionalInfoDialog} from "../components/aggridSolutionComponents/ClientAdditionalInfoDialog";
import {setTopBarTitle} from "../store/slices/appSlice";
import {useAppDispatch} from "../store/store";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        flex: 1,
        height: '100vh',
    },
    content: {
        flex: 1,
    },
    pageArea: {
        flex: 1,
        overflow: 'auto',
        padding: theme.spacing(1)
    },
}));

const AgGridSolutionPage = () => {
    const classes = useStyles();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setTopBarTitle("Customers portfolios with AG Grid component"));
    }, [dispatch])

    return (<div className={classes.root}>
        <Grid container direction='column' className={classes.content}>
            <Grid container className={classes.pageArea}>
                <MainComponent/>
            </Grid>
            <ClientAdditionalInfoDialog/>
        </Grid>
    </div>);

};

export default AgGridSolutionPage;
