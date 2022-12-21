import React, {useEffect} from 'react';
import {Theme} from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import {setTopBarTitle} from "../store/slices/appSlice";
import {useAppDispatch} from "../store/store";
import {CollapsibleTable} from "../components/home/HomeComponent";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        flex: 1,
    }
}));

const DashboardPage = () => {
    const classes = useStyles();
    const dispatch = useAppDispatch();

    /**
     * Sets the title for the page in the topBar component
     */
    useEffect(() => {
        dispatch(setTopBarTitle("Customers portfolios"));
    }, [dispatch])

    return (<div className={classes.root}>
        <CollapsibleTable/>
    </div>);

};

export default DashboardPage;
