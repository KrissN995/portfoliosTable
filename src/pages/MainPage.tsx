import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import {Grid, Theme} from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import Topbar from "../components/shared/Topbar";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex', height: '100vh',
    }, appBarSpacer: theme.mixins.toolbar, content: {
        flex: 1,
    }, pageArea: {
        flex: 1, overflow: 'auto', padding: theme.spacing(1)
    },
}));

const MainPage = () => {
    const classes = useStyles();

    //<div className={'App'}
    //             style={{
    //                 overflow: 'auto',
    //                 height: `calc('100%' - '4em')`,
    //                 backgroundColor: theme.palette.background.default,
    //                 color: theme.palette.text.primary,
    //             }}>
    //     <CssBaseline/>
    //     <Grid sx={{backgroundColor: theme.palette.background.paper}}>
    //         <Button onClick={() => handleThemeChange()}>
    //             Theme
    //         </Button>
    //         <Typography variant={'h6'}
    //                     sx={{color: isDarkTheme ? theme.palette.success.main : theme.palette.error.main}}>Check if color
    //             will change</Typography>
    //     </Grid>
    // </div>;

    return (<div className={classes.root}>
        <CssBaseline/>
        <Topbar/>
        <Grid container direction='column' className={classes.content}>
            <Grid className={classes.appBarSpacer}/>
            <Grid container className={classes.pageArea}>
            </Grid>
        </Grid>
    </div>);

};

export default MainPage;
