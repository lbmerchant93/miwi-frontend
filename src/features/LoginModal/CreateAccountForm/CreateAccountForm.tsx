import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { Auth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useLoginUser } from '../../../api/users/user';
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from 'react-router-dom';

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

    const createAccount = async (email: string, password: string, firstName: string, lastName: string) => {
        setIsLoading(true)
        const displayName = firstName + ' ' + lastName
        try {
            const createdUser = await createUserWithEmailAndPassword(auth, email, password)
            updateProfile(createdUser.user, {displayName: displayName})
            loginUser.mutate({id: createdUser.user.uid, email: email, displayName: displayName}, {
                onError: (err: any) => {
                    console.log(err)
                },
                onSuccess: () => {
                    onClose()
                    navigate('/dashboard/home')
                }
            })
        } catch (error: any) {
            setError(error.message);
            setIsLoading(false)
        }    
    };

    return (
        <Box>
            <form className="login-form">
                <Box className="login-form-input">
                    <TextField 
                        label="First Name" 
                        id="FirstName" 
                        variant="outlined" 
                        value={firstName} 
                        onChange={(e) => setFirstName(e.currentTarget.value)} 
                        fullWidth={true}
                    />
                </Box>
                <Box className="login-form-input">
                    <TextField 
                        label="Last Name" 
                        id="LastName" 
                        variant="outlined" 
                        value={lastName} 
                        onChange={(e) => setLastName(e.currentTarget.value)} 
                        fullWidth={true}
                    />
                </Box>
                <Box className="login-form-input">
                    <TextField 
                        label="Email" 
                        id="Email" 
                        variant="outlined" 
                        value={email} 
                        onChange={(e) => setEmail(e.currentTarget.value)} 
                        fullWidth={true}
                    />
                </Box>
                <Box className="login-form-input">
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
    )
}

export default CreateAccountForm;