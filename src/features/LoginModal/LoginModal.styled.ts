import styled from 'styled-components/macro';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

export const ModalLogin = styled(Modal)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const LoginModalContainer = styled(Box)`
    max-width: 712px;
    padding: 0px 20px 20px;
    background-color: white;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
`;

export const LoginModalTitle = styled(Box)`
    text-align: left;
    margin-bottom: 25px;
`;

// .login-modal {
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
// }

// .login-modal-container {
//     max-width: 712px;
//     padding: 0px 20px 20px;
//     background-color: white;
//     border-radius: 5px;
//     display: flex;
//     flex-direction: column;
// }

// .login-modal-title {
//     text-align: left;
//     margin-bottom: 25px;
// }