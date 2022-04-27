import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { Auth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useCreateUser } from '../../../api/users/user';

interface CreateAccountFormProps {
    auth: Auth;
    goBack: () => void;
}

const CreateAccountForm: React.FC<CreateAccountFormProps> = (props) => {
    const { auth, goBack } = props;
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [error, setError] = useState<string>('');
    const createUser = useCreateUser();

    const createAccount = async (email: string, password: string, firstName: string, lastName: string) => {
        const displayName = firstName + ' ' + lastName
        try {
            const createdUser = await createUserWithEmailAndPassword(auth, email, password)
            updateProfile(createdUser.user, {displayName: displayName})
            createUser.mutate({id: createdUser.user.uid, email: email, displayName: displayName}, {
                onError: (err: any) => {
                    console.log(err)
                },
                onSuccess: () => {
                    console.log("user created")
                }
            })
        } catch (error: any) {
            setError(error.message);
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
                    <Button 
                        variant="outlined" 
                        color="inherit" 
                        onClick={() => createAccount(email, password, firstName, lastName)}
                    >
                            Create Account
                    </Button>  
                </Box>
            </form>
            <Typography variant="caption">
                Already have an account? <Link component="button" variant="caption" color="#0000EE" onClick={goBack}>Log in</Link>
            </Typography>
        </Box>
    )
}

export default CreateAccountForm;