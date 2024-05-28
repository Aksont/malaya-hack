import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#90caf9',
            light: '#e3f2fd',
            dark: '#42a5f5',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#f48fb1',
            light: '#f8bbd0',
            dark: '#c2185b',
            contrastText: '#ffffff',
        },
        background: {
            default: '#121212',
            paper: '#1e1e1e',
        },
        text: {
            primary: '#ffffff',
            secondary: '#b0bec5',
            disabled: '#757575',
            hint: '#8d8d8d',
        },
        error: {
            main: '#f44336',
        },
        warning: {
            main: '#ffa726',
        },
        info: {
            main: '#29b6f6',
        },
        success: {
            main: '#66bb6a',
        },
        divider: '#424242',
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                colorPrimary: {
                    backgroundColor: '#333',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: 'none',
                },
                containedPrimary: {
                    backgroundColor: '#2196f3',
                    color: '#fff',
                    '&:hover': {
                        backgroundColor: '#1976d2',
                    },
                },
                outlinedPrimary: {
                    borderColor: '#2196f3',
                    color: '#2196f3',
                    '&:hover': {
                        borderColor: '#1976d2',
                        color: '#1976d2',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: '#1e1e1e',
                    color: '#fff',
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#1e1e1e',
                    color: '#b0bec5',
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderBottom: '1px solid #424242',
                },
                head: {
                    color: '#fff',
                    backgroundColor: '#333',
                },
                body: {
                    color: '#b0bec5',
                },
            },
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    backgroundColor: '#616161',
                    color: '#fff',
                },
            },
        },
        MuiTypography: {
            defaultProps: {
                color: '#ffffff',
                variantMapping: {
                    h1: 'h2',
                    h2: 'h2',
                    h3: 'h2',
                    h4: 'h2',
                    h5: 'h2',
                    h6: 'h2',
                    subtitle1: 'h2',
                    subtitle2: 'h2',
                    body1: 'span',
                    body2: 'span',
                },
            },
            fontFamily: 'Roboto, Arial, sans-serif',
            h1: {
                fontSize: '2.125rem',
                fontWeight: 300,
                lineHeight: 1.2,
                letterSpacing: '0.01562em',
            },
            h2: {
                fontSize: '1.75rem',
                fontWeight: 300,
                lineHeight: 1.2,
                letterSpacing: '0.01562em',
            },
            h3: {
                fontSize: '1.5rem',
                fontWeight: 400,
                lineHeight: 1.167,
                letterSpacing: '0.01562em',
            },
            h4: {
                fontSize: '1.25rem',
                fontWeight: 400,
                lineHeight: 1.235,
                letterSpacing: '0.01562em',
            },
            h5: {
                fontSize: '1rem',
                fontWeight: 400,
                lineHeight: 1.334,
                letterSpacing: '0.01562em',
            },
            h6: {
                fontSize: '0.875rem',
                fontWeight: 500,
                lineHeight: 1.6,
                letterSpacing: '0.01562em',
            },
            body1: {
                fontSize: '1rem',
                fontWeight: 400,
                lineHeight: 1.5,
                letterSpacing: '0.00938em',
            },
            body2: {
                fontSize: '0.875rem',
                fontWeight: 400,
                lineHeight: 1.43,
                letterSpacing: '0.01071em',
            },
            button: {
                fontSize: '0.875rem',
                fontWeight: 500,
                lineHeight: 1.75,
                letterSpacing: '0.02857em',
                textTransform: 'uppercase',
            },
            caption: {
                fontSize: '0.75rem',
                fontWeight: 400,
                lineHeight: 1.66,
                letterSpacing: '0.03333em',
            },
            overline: {
                fontSize: '0.75rem',
                fontWeight: 400,
                lineHeight: 2.66,
                letterSpacing: '0.08333em',
                textTransform: 'uppercase',
            },
        },
    },
});

export default theme;
