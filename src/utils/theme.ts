import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#35B9B7',
    },
  },
  typography: {
    fontFamily: 'inherit',
    fontWeightBold: '500',
    fontWeightExtraBold: '700',
    h3: {
      fontSize: '2.5rem',
    },
    h4: {
      fontSize: '1.75rem',
    },
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          color: '#804EE1',
          minWidth: '15rem',
          '&.Mui-disabled': {
            opacity: 0.7,
          },
          '@media (max-width:1023px)': {
            minWidth: '100%',
          },
        },
        contained: {
          background: '#804EE1 !important',
          color: 'white',
          '&.Mui-disabled': {
            color: 'white',
          },
        },
        outlined: {
          background: 'transparent',
          border: '1px solid #222222',
          color: '#222222',
          '&:hover': {
            background: '#F5F5F5',
            border: '1px solid #222222',
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          padding: '0 9px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& label.Mui-focused': {
            color: '#804EE1',
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          padding: '15px 20px',
          borderRadius: '6px',
          backgroundColor: '#222222',
          '& .MuiTooltip-arrow': {
            color: '#222222',
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          padding: '6px 9rem 6px 14rem',
          borderRadius: '0px',
          position: 'sticky',
          top: '0',
          zIndex: '999',
        },
        filledWarning: {
          background: '#FF8022',
          '@media (max-width: 600px)': {
            padding: '6px 2rem 6px 2rem',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          borderBottom: 'none',
        },
        indicator: {
          backgroundColor: 'transparent',
          borderBottom: 'none',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          borderRadius: '10px 10px 0 0',
          padding: '8px 24px',
          width: '214px',
          height: '40px',
          gap: '10px',
          borderBottom: 'none',
          '&.Mui-selected': {
            background: '#804EE1',
            color: 'white',
            border: 0,
            borderBottom: 'none',
          },
          '&$selected': {
            borderBottom: 'none',
          },
          '&:not(.Mui-selected)': {
            backgroundColor: '#EDEDED',
            color: '#222222',
          },
          selected: {},
        },
      },
    },
  },
});
declare module '@mui/material/styles/createTypography' {
  interface TypographyOptions {
    fontWeightExtraBold?: string;
  }

  interface Typography {
    fontWeightExtraBold: string;
  }
}
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
