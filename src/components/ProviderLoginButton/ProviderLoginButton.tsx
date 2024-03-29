import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import GoogleIcon from '../../shared/Google.icon';
import LoadingButton from '@mui/lab/LoadingButton';

interface ProviderLoginButtonsProps {
    message: string;
    isLoading: boolean;
    loginWithGoogle: () => Promise<void>;
}

const ProviderLoginButton: React.FC<ProviderLoginButtonsProps> = (props) => {
    const { message, isLoading, loginWithGoogle } = props;
    
    return (
        <Box className="provider-login-button" ml={"10px"}>
            <LoadingButton variant="outlined" onClick={() => loginWithGoogle()} color="inherit" loading={isLoading}>
                {!isLoading && <GoogleIcon />}
                <Box className="provider-login-text-wrapper" ml={"5px"}>
                    <Typography variant="body1">{message}</Typography>
                </Box>
            </LoadingButton>
        </Box>
    )
}

export default ProviderLoginButton;