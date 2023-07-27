import styled from 'styled-components/macro';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

export const MessagePageContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
`;

export const MessagePageLink = styled(Link)`
    cursor: pointer;
`;