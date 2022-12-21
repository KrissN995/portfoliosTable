import React, {useEffect} from 'react';
import {Grid, Theme} from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import {setTopBarTitle} from "../store/slices/appSlice";
import {useAppDispatch} from "../store/store";
import { CollapsibleTable } from "../components/home/HomeComponent";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        flex: 1,
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

const DashboardPage = () => {
    const classes = useStyles();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setTopBarTitle("Customers portfolios"));
    }, [dispatch])

    return (<div className={classes.root}>
        <Grid container direction='column' className={classes.content}>
            <Grid className={classes.appBarSpacer}/>
            <Grid container className={classes.pageArea}>
                <CollapsibleTable/>
            </Grid>
        </Grid>
    </div>);

};

export default DashboardPage;
