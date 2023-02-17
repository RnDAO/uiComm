import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#35B9B7',
    },
  },
  typography: {
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
          color: '#804EE1',
          '&.Mui-disabled': {
            opacity: 0.7,
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
        filledWarning: { background: '#FF8022' },
      },
    },
  },
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
