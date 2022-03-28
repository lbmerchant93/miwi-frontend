import React from 'react';
import Snackbar, { SnackbarProps } from '@mui/material/Snackbar';

export type SnackBarDetails = {
    error: boolean;
    show: boolean;
    message: string;
  };

export const SnackBar: React.FC<SnackbarProps> = (props) => {
    const { open = false, autoHideDuration = 2000, onClose, children, ...rest } = props;

    return (
        <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={onClose} anchorOrigin={{vertical: 'top', horizontal: 'center'}} {...rest}>
            {children}
        </Snackbar>
    )
};