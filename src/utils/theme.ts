import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#35B9B7'
        }
    },
    typography: {
        button: {
            textTransform: 'none'
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: "4px",
                    color: "#909090",
                    background:'red',
                    "&.Mui-disabled": {
                        opacity: 0.7,
                    }
                }
            }
        },
        MuiCheckbox:{
            styleOverrides:{
                root:{
                    padding:'0 9px'
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& label.Mui-focused": {
                        color: '#909090'
                    },
                }
            }
        }
    }
});

declare module '@mui/material/styles' {
    interface Palette {
        neutral: Palette['primary'];
    }

    // allow configuration using `createTheme`
    interface PaletteOptions {
        neutral?: PaletteOptions['primary'];
    }
}

// Update the Button's color prop options
declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        primary: true;
    }
}