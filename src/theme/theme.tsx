import {createTheme, darken} from '@mui/material';
import {blue} from '@mui/material/colors';

/**
 * Creat light theme using material ui
 * Set the typography properties based on your preferences (fontFamily, fontWeight)
 * Set palette default properties to colors of your choice
 * Override material ui components like scrollbars, icons or tooltips
 */
export const lightTheme = createTheme({
    typography: {
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 600
    },
    palette: {
        mode: 'light',
        primary: {
            main: '#9f2924',
            dark: '#68686e'
        },
        secondary: {
            main: '#181d1f'
        },
        success: {
            main: 'rgba(19, 219, 75, 0.2)'
        },
        warning: {
            main: '#FF9826'
        },
        error: {
            main: '#660700'
        },
        info: {
            main: blue[900]
        },
        background: {
            paper: '#f1f1f1',
            default: '#FFFFFF'
        },
        text: {
            primary: '#000000'
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                '*::-webkit-scrollbar': {
                    width: '.5em',
                    height: '.5em'
                },
                '*::-webkit-scrollbar-track': {
                    backgroundColor: '#fafafa'
                },
                '*::-webkit-scrollbar-thumb': {
                    backgroundColor: '#c2c2c2',
                    borderRadius: 10,
                    backgroundClip: 'content-box'
                },
                '*::-webkit-scrollbar-corner': {
                    backgroundColor: '#fafafa'
                }
            }
        },
        MuiIcon: {
            styleOverrides: {
                colorPrimary: {
                    color: 'red'
                }
            }
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    padding: '0.1em'
                }
            }
        }
    }
});

/**
 * Creat dark theme using material ui
 * Set the typography properties based on your preferences (fontFamily, fontWeight)
 * Set palette default properties to colors of your choice
 * Override material ui components like scrollbars, icons or tooltips
 */
export const darkTheme = createTheme({
    typography: {
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 600
    },
    palette: {
        mode: 'dark',
        primary: {
            main: darken('#9f2924', .2),
            dark: '#a1a7a9'
        },
        secondary: {
            main: '#fc851e'
        },
        success: {
            main: '#00B10A'
        },
        warning: {
            main: '#FF9826'
        },
        error: {
            main: '#660700'
        },
        info: {
            main: blue[800]
        },
        background: {
            paper: '#181d1f',
            default: '#000000'
        },
        text: {
            primary: '#FFFFFF'
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                '*::-webkit-scrollbar': {
                    width: '.5em',
                    height: '.5em'
                },
                '*::-webkit-scrollbar-track': {
                    backgroundColor: '#181d1f'
                },
                '*::-webkit-scrollbar-thumb': {
                    backgroundColor: '#68686e',
                    borderRadius: 10,
                    backgroundClip: 'content-box'
                },
                '*::-webkit-scrollbar-corner': {
                    backgroundColor: '#181d1f'
                }
            }
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    padding: '0.1em'
                }
            }
        }
    }
});
