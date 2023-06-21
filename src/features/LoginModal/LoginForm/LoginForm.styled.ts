import styled from 'styled-components/macro';
import Box from '@mui/material/Box';

export const LoginFormOptions = styled(Box)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const FormLogin = styled.form`
    width: 300px;
    display: flex;
    flex-direction: column;
    align-content: space-between;
    margin-right: 10px;
    margin-bottom: 10px;
`;

export const LoginFormButtonContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
`;

// .login-form-options {
//     display: flex;
//     flex-direction: row;
//     justify-content: space-between;
// }

// .login-form {
//     width: 300px;
//     display: flex;
//     flex-direction: column;
//     align-content: space-between;
//     margin-right: 10px;
//     margin-bottom: 10px;
// }

// .login-form-input {
//     margin-bottom: 10px;
// }

// .login-form-buttons {
//     display: flex;
//     flex-direction: column;
//     text-align: center;
//     justify-content: center;
// }