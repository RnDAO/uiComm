import React, { createContext, useState, useContext, ReactNode } from 'react';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import Alert, { AlertColor } from '@mui/material/Alert';

type SnackbarContextType = {
  showMessage: (
    message: string,
    severity?: AlertColor,
    position?: SnackbarOrigin
  ) => void;
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

type SnackbarProviderProps = {
  children: ReactNode;
};

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<AlertColor>('info');
  const [position, setPosition] = useState<SnackbarOrigin>({
    vertical: 'bottom',
    horizontal: 'center',
  });

  const showMessage = (
    newMessage: string,
    newSeverity: AlertColor = 'info',
    newPosition: SnackbarOrigin = { vertical: 'bottom', horizontal: 'center' }
  ) => {
    setMessage(newMessage);
    setSeverity(newSeverity);
    setPosition(newPosition);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ showMessage }}>
      {children}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};
