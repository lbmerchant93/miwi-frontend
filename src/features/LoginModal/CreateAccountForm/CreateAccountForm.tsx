import React, { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useLoginUser } from '../../../api/users/user';
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import ProviderLoginButton from '../../../components/ProviderLoginButton/ProviderLoginButton';
import GuestLoginButton from '../../../components/GuestLoginButton/GuestLoginButton';
import { AuthContext } from '../../../shared/auth-context';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
    FormCreateAccount,
    CreateAccountFormOptions,
    CreateAccountFormButtonsContainer
} from './CreateAccountForm.styled';

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
    const isMobile = useMediaQuery('(max-width:640px)');

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

    const loginAsGuest = async () => {
        setIsLoading(true)
        try {
            const userLogin = await signInWithEmailAndPassword(auth, "guestviewer@guest.com", "guestviewer")
            loginUser.mutate({ id: userLogin.user.uid, email: userLogin.user.email, displayName: userLogin.user.displayName }, {
                onError: (err: any) => {
                    setError(err.response.errors[0].message || 'Something went wrong, please try again or contact us for help.')
                    setIsLoading(false)
                    console.log(err)
                },
                onSuccess: (data) => {
                    user.setUserId(userLogin.user.uid)
                    user.setGoals(data.goals)
                    setIsLoading(false)
                    onClose()
                    navigate(`/home/${userLogin.user.email?.split('@')[0]}`)
                }
            })
        } catch (err: any) {
            setError(err.message)
            setIsLoading(false)
            console.log(err.message)
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
        <CreateAccountFormOptions className="create-account-form-options" flexDirection={isMobile ? "column" : "row"}>
            <Box className="create-account-form-container" display="flex" flexDirection="column" alignItems="center" mb={isMobile ? 2 : 0}>
                <FormCreateAccount className="create-account-form">
                    <Box className="create-account-form-input" mb={"10px"}>
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
                    <Box className="create-account-form-input" mb={"10px"}>
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
                    <Box className="create-account-form-input" mb={"10px"}>
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
                    <Box className="create-account-form-input" mb={"10px"}>
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
                </FormCreateAccount>
                <Typography variant="caption">
                    Already have an account? <Link component="button" variant="caption" color="#0000EE" onClick={goBack}>Log in</Link>
                </Typography>
            </Box>
            <Divider orientation={isMobile ? "horizontal" : "vertical"} />
            <CreateAccountFormButtonsContainer className="create-account-form-buttons" mt={isMobile ? 2 : 0}>
                <ProviderLoginButton 
                    message={"Register with Google"} 
                    isLoading={isLoading}
                    loginWithGoogle={loginWithGoogle}
                />
                <Typography variant="caption" my={3}>
                    OR
                </Typography>
                <GuestLoginButton 
                    loginAsGuest={loginAsGuest}
                    isLoading={isLoading}
                />
            </CreateAccountFormButtonsContainer>
        </CreateAccountFormOptions>
    )
}

export default CreateAccountForm;