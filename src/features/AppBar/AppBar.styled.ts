import styled from 'styled-components/macro';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';

export const ToolBar = styled(Toolbar)`
    width: 100%;
    justify-content: center;
    box-shadow: 0px 4px 7px -4px rgb(0 0 0 / 20%);
`

export const ToolBarContainer = styled(Box)`
    display: flex;
    justify-content: space-between; 
    align-items: center;
    max-width: 1232px;
    width: 100%;
`

export const TitleLink = styled(Link)`
    text-decoration: none;
    color: black;
    padding: 3px;
    display: flex;
    align-items: center;
`

export const TitleText = styled(Typography)`
    font-size: 3rem !important;
    color: #6d0f93;
`

export const LogoutLink = styled(Link)`
    text-decoration: none;
    color: inherit;
    height: 100%;
    width: 100%;
`