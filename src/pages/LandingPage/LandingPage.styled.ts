import styled from 'styled-components/macro';
import Box from '@mui/material/Box';

export const LandingPageContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
`;

export const LandingPageDescriptionContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #6d0f93;
    color: white;
    align-self: center;
    border: rgb(0 0 0 / 20%) solid 1px;
    box-shadow: -11px 11px 3px -4px rgb(0 0 0 / 20%);
`;

export const LandingPageDescriptionMiddleContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #6d0f93;
    align-self: center;
    border: rgb(0 0 0 / 20%) solid 1px;
    box-shadow: 11px 11px 7px -4px rgb(0 0 0 / 20%);
`;