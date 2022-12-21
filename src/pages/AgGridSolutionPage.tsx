import React, {useEffect} from 'react';
import {Theme} from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import {ClientAdditionalInfoDialog} from "../components/aggridSolutionComponents/ClientAdditionalInfoDialog";
import {useAppDispatch} from "../store/store";
import {setTopBarTitle} from "../store/slices/appSlice";
import AgGridMainComponent from "../components/aggridSolutionComponents/AgGridMainComponent";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        flex: 1,
    },
}));

const AgGridSolutionPage = () => {
    const classes = useStyles();
    const dispatch = useAppDispatch();

    /**
     * Sets the title for the page in the topBar component
     */
    useEffect(() => {
        dispatch(setTopBarTitle("Customers portfolios with AG Grid"));
    }, [dispatch])

    return (<div className={classes.root}>
        <AgGridMainComponent/>
        <ClientAdditionalInfoDialog/>
    </div>);

};

export default AgGridSolutionPage;
