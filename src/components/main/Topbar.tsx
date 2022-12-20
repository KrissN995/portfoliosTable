import {useTheme} from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';
import {useAppDispatch} from '../../store/store';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/slices/rootSlice';
import {AppBar, Grid, IconButton, Theme, Tooltip} from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import {setIsDarkTheme, setIsDrawerOpen} from "../../store/slices/appSlice";
import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";
import MenuIcon from "@mui/icons-material/Menu";

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
        menuButton: {
            marginRight: theme.spacing(2),
        },
        menuButtonHidden: {
            display: 'none',
        },
    })
);

const TopBarComponent = () => {
    const theme = useTheme();
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const {
        isDarkTheme,
        drawerOpen,
        topBarTitle
    } = useSelector((state: RootState) => state.app);

    /**
     * Changes the theme of the app
     */
    const handleThemeChange = () => {
        dispatch(setIsDarkTheme(!isDarkTheme));
    }

    const handleDrawerOpen = () => {
        dispatch(setIsDrawerOpen(true));
    };

    return <AppBar position="absolute" className={classes.appBar}
                   sx={{backgroundColor: theme.palette.background.paper, color: theme.palette.text.primary}}>
        <Toolbar>
            <Grid container sx={{
                display: 'flex',
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Grid item xs={10} sx={{display: 'flex', alignItems: 'center', justifyContent: 'start', flex: 1}}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, drawerOpen && classes.menuButtonHidden)}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        {topBarTitle}
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
