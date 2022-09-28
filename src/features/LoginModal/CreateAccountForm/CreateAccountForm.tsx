import React, { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { Auth, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useLoginUser } from '../../../api/users/user';
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import ProviderLoginButton from '../../../components/ProviderLoginButton/ProviderLoginButton';
import { AuthContext } from '../../../shared/auth-context';

import './CreateAccountForm.css';

interface CreateAccountFormProps {
    auth: Auth;
    goBack: () => void;
    onClose: () => void;
}

const CreateAccountForm: React.FC<CreateAccountFormProps> = (props) => {
    const { auth, goBack, onClose } = props;
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const loginUser = useLoginUser();
    const navigate = useNavigate();
    const user = useContext(AuthContext);

    const createAccount = async (email: string, password: string, firstName: string, lastName: string) => {
        setIsLoading(true)
        const displayName = firstName + ' ' + lastName
        try {
            const createdUser = await createUserWithEmailAndPassword(auth, email, password)
            updateProfile(createdUser.user, {displayName: displayName})
            loginUser.mutate({id: createdUser.user.uid, email: email, displayName: displayName}, {
                onError: (err: any) => {
                    setError(err.response.errors[0].message || 'Something went wrong, please try again or contact us for help.')
                    setIsLoading(false)
                    console.log(err)
                },
                onSuccess: () => {
                    user.setDisplayName(displayName)
                    setIsLoading(false)
                    onClose()
                    navigate(`/home/${createdUser.user.email?.split('@')[0]}`)
                }
            })
        } catch (error: any) {
            setError(error.message);
            setIsLoading(false)
        }    
    };

    const loginWithGoogle = async () => {
        setIsLoading(true)
        try {
            const user = await signInWithPopup(auth, new GoogleAuthProvider());
            loginUser.mutate({ id: user.user.uid, email: user.user.email, displayName: user.user.displayName }, {
                onError: (err: any) => {
                    setError(err.response.errors[0].message || 'Something went wrong, please try again or contact us for help.')
                    console.log(err)
                },
                onSuccess: () => {
                    navigate(`/home/${user.user.email?.split('@')[0]}`)
                    onClose()
                }
            })
        } catch (err: any) {
            setIsLoading(false)
            setError(err.message);
            console.log('error signing in', err.message);
        }
    };

    return (
        <>
            <Box className="create-account-form-options">
                <Box className="create-account-form-container">
                    <form className="create-account-form">
                        <Box className="create-account-form-input">
                            <TextField 
                                label="First Name" 
                                id="FirstName" 
                                variant="outlined" 
                                value={firstName} 
                                onChange={(e) => setFirstName(e.currentTarget.value)} 
                                fullWidth={true}
                                disabled={isLoading}
                            />
                        </Box>
                        <Box className="create-account-form-input">
                            <TextField 
                                label="Last Name" 
                                id="LastName" 
                                variant="outlined" 
                                value={lastName} 
                                onChange={(e) => setLastName(e.currentTarget.value)} 
                                fullWidth={true}
                                disabled={isLoading}
                            />
                        </Box>
                        <Box className="create-account-form-input">
                            <TextField 
                                label="Email" 
                                id="Email" 
                                variant="outlined" 
                                value={email} 
                                onChange={(e) => setEmail(e.currentTarget.value)} 
                                fullWidth={true}
                                disabled={isLoading}
                            />
                        </Box>
                        <Box className="create-account-form-input">
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
                                disabled={isLoading}
                            />
                        </Box>
                        <Box>
                            <LoadingButton 
                                variant="outlined" 
                                color="inherit" 
                                onClick={() => createAccount(email, password, firstName, lastName)}
                                loading={isLoading}
                            >
                                    Create Account
                            </LoadingButton>  
                        </Box>
                    </form>
                    <Typography variant="caption">
                        Already have an account? <Link component="button" variant="caption" color="#0000EE" onClick={goBack}>Log in</Link>
                    </Typography>
                </Box>
                <Divider orientation="vertical" />
                <Box className="create-account-form-buttons">
                    <ProviderLoginButton 
                        message={"Register with Google"} 
                        isLoading={isLoading}
                        loginWithGoogle={loginWithGoogle}
                    />
                </Box>
            </Box>
        </>
    )
}

export default CreateAccountForm;