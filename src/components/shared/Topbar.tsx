import {useTheme} from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';
import {useAppDispatch} from '../../store/store';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/slices/rootSlice';
import {AppBar, Grid, IconButton, Theme, Tooltip} from '@mui/material';
import useWindowSize from "../../hooks/useWindowSize";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import {setIsDarkTheme} from "../../store/slices/appSlice";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme: Theme) =>
    ({
        toolbar: {
            flex: 1,
            paddingRight: 5
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarSpacer: theme.mixins.toolbar,
    })
);

const TopBarComponent = () => {
    const theme = useTheme();
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const {
        isDarkTheme,
    } = useSelector((state: RootState) => state.app);
    const windowSize = useWindowSize()

    const handleThemeChange = () => {
        dispatch(setIsDarkTheme(!isDarkTheme));
    }


    return <AppBar position="absolute" className={classes.appBar}>
        <Toolbar>
            <Grid container sx={{
                display: 'flex',
                flexDirection: 'row',
                flex: 1,
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Grid item xs={10}>
                    <Typography variant="h6" noWrap>
                        Customers Portfolios
                    </Typography>
                </Grid>
                <Grid item xs={2} sx={{display: 'flex', alignItems: 'center', justifyContent: 'end', flex: 1}}>
                    <IconButton color="inherit" onClick={handleThemeChange} aria-label="Light/Dark">
                        <Tooltip title="Toggle light/dark theme">
                            <DarkModeIcon/>
                        </Tooltip>
                    </IconButton>
                </Grid>
            </Grid>
        </Toolbar>
    </AppBar>;
};

export default TopBarComponent;
