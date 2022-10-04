import React, { useState, FormEvent } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { 
    getAuth, 
    deleteUser, 
    EmailAuthProvider, 
    reauthenticateWithCredential, 
    reauthenticateWithPopup, 
    GoogleAuthProvider
} from "firebase/auth";
import { useDeleteUser } from '../../api/users/user';
import { User } from '../../shared/auth-context';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';

interface DeleteAccountModalProps {
    isOpen: boolean;
    onClose: () => void;
    triggerSnackBar: (err: boolean, message: string) => void;
    user: User;
}

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = (props) => {
    const { isOpen, onClose, triggerSnackBar, user } = props;
    const auth = getAuth();
    const provider = auth.currentUser?.providerData[0].providerId;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const deleteUserAccount = useDeleteUser();

    const onDeleteWithEmailAndPassword = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        if (auth.currentUser?.email) {
            try {
                deleteUserAccount.mutate(user.id, {
                    onError: (err: any) => {
                        setError(err.response.errors[0].message || 'Something went wrong, please try again or contact us for help.')
                        triggerSnackBar(true, err.response.errors[0].message || 'Something went wrong, please try again or contact us for help.');
                        setIsLoading(false)
                    },
                })

                const credential = EmailAuthProvider.credential(
                    auth.currentUser.email, 
                    password
                )

                const result = await reauthenticateWithCredential(
                    auth.currentUser,
                    credential
                )

                await deleteUser(result.user)
                
            } catch (err: any) {
                triggerSnackBar(true, err.message || 'Something went wrong, please try again or contact us for help.');
                setIsLoading(false)
            } 
        } else {
            triggerSnackBar(true, 'Something went wrong, please try again or contact us for help.');
            setIsLoading(false)
        }
    };

    const onDeleteWithGoogle = async () => {
        setIsLoading(true);
        if (auth.currentUser) {
            try {
                const provider = new GoogleAuthProvider();
                const result = await reauthenticateWithPopup(auth.currentUser, provider);
                await deleteUserAccount.mutate(user.id, {
                    onError: (err: any) => {
                        triggerSnackBar(true, err.response.errors[0].message || 'Something went wrong, please try again or contact us for help.');
                        setIsLoading(false)
                    },
                })
                await deleteUser(result.user)
            } catch (err: any) {
                triggerSnackBar(true, err.message || 'Something went wrong, please try again or contact us for help.');
                setIsLoading(false)
            } 
        } else {
            triggerSnackBar(true, 'Something went wrong, please try again or contact us for help.');
            setIsLoading(false)
        }
    };

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby={`Delete Account`}
            aria-describedby={`Delete Account`}
            className="delete-account-modal"
        >
            <Box bgcolor="white" width={450} height={300} position={"relative"} p={3} left={"50%"} top={"50%"} style={{ transform: 'translate(-50%, -50%)' }}>
                <Box position={"absolute"} left={"92%"} top={"1%"}>
                    <IconButton onClick={onClose} edge="start" color="inherit" aria-label="exit">
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Box display="flex" flexDirection="column" alignItems="center" mt={3} textAlign="center">
                    <Typography variant="h4" color="warning.main">Warning!</Typography>
                    {(provider === "password") && <>
                            <Typography variant="h6" mb={2}>Are you sure you want to delete your account? If so, please enter your password below and select Delete Account. This action is irreversible.</Typography>
                            <form onSubmit={onDeleteWithEmailAndPassword}>
                                <Box display="flex" flexDirection="column" alignItems="center">
                                    <Box>
                                        <TextField 
                                            label="Password" 
                                            id="Password" 
                                            variant="outlined" 
                                            type="password" 
                                            value={password} 
                                            error={!!error}
                                            helperText={error}
                                            onChange={(e) => setPassword(e.currentTarget.value)} 
                                            fullWidth={true}
                                        />
                                    </Box>
                                    <Box m={2} display="flex" flexDirection="row" justifyContent="center">
                                        {!isLoading && <Box m={1}>
                                            <LoadingButton
                                                loading={isLoading}
                                                onClick={onClose} 
                                                variant="contained" 
                                                color="inherit"
                                            >
                                                    No, Go back
                                            </LoadingButton>  
                                        </Box>}
                                        <Box m={1}>
                                            <LoadingButton 
                                                loading={isLoading}
                                                type="submit" 
                                                variant="contained" 
                                                color="warning"
                                            >
                                                    Delete Account
                                            </LoadingButton> 
                                        </Box>
                                    </Box>
                                </Box>
                            </form>
                        </>}
                        {(provider === "google.com") && <>
                            <Typography variant="h6">Are you sure you want to delete your account? If so, select Delete Account and authenticate this action using your google account. This action is irreversible.</Typography>
                            <Box m={1} display="flex" flexDirection="row" justifyContent="center">
                                {!isLoading && <Box m={1}>
                                    <LoadingButton
                                        loading={isLoading}
                                        onClick={onClose} 
                                        variant="contained" 
                                        color="inherit"
                                    >
                                            No, Go back
                                    </LoadingButton>  
                                </Box>}
                                <Box m={1}>
                                    <LoadingButton 
                                        loading={isLoading}
                                        onClick={onDeleteWithGoogle}
                                        variant="contained" 
                                        color="warning"
                                    >
                                            Delete Account
                                    </LoadingButton> 
                                </Box>
                            </Box>
                        </>}
                </Box>
            </Box>
        </Modal>
    );
};

export default DeleteAccountModal;