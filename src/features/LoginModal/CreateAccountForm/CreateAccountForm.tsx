import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { User } from '../../../shared/auth-context';

interface CreateAccountFormProps {
    user: User;
    goBack: () => void;
}

const CreateAccountForm: React.FC<CreateAccountFormProps> = (props) => {
    const { user, goBack } = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.id === "Email") {
            setEmail(e.currentTarget.value)
        } else if (e.currentTarget.id === "Password") {
            setPassword(e.currentTarget.value)
        } else if (e.currentTarget.id === "FirstName") {
            setFirstName(e.currentTarget.value)
        } else if (e.currentTarget.id === "LastName") {
            setLastName(e.currentTarget.value)
        }
    };

    const onCreateAccount = () => {
        const displayName = firstName + ' ' + lastName
        user.createAccount(email, password, displayName)
    }

    return (
        <Box>
            <form className="login-form">
                <Box className="login-form-input">
                    <TextField label="First Name" id="FirstName" variant="outlined" value={firstName} onChange={handleChange} fullWidth={true}/>
                </Box>
                <Box className="login-form-input">
                    <TextField label="Last Name" id="LastName" variant="outlined" value={lastName} onChange={handleChange} fullWidth={true}/>
                </Box>
                <Box className="login-form-input">
                    <TextField label="Email" id="Email" variant="outlined" value={email} onChange={handleChange} fullWidth={true}/>
                </Box>
                <Box className="login-form-input">
                    <TextField label="Password" id="Password" variant="outlined" type="password" value={password} onChange={handleChange} fullWidth={true}/>
                </Box>
                <Box>
                    <Button variant="outlined" color="inherit" onClick={onCreateAccount}>Create Account</Button>  
                </Box>
            </form>
            <Typography variant="caption">
                Already have an account? <Link component="button" variant="caption" color="#0000EE" onClick={goBack}>Log in</Link>
            </Typography>
        </Box>
    )
}

export default CreateAccountForm;