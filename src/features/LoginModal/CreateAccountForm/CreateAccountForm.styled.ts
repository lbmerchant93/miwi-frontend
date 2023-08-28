import styled from 'styled-components/macro';
import Box from '@mui/material/Box';

export const CreateAccountFormOptions = styled(Box)`
    display: flex;
    justify-content: space-between;
`;

export const FormCreateAccount = styled.form`
    width: 300px;
    display: flex;
    flex-direction: column;
    align-content: space-between;
    margin-right: 10px;
    margin-bottom: 10px;
`;

export const CreateAccountFormButtonsContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
`;