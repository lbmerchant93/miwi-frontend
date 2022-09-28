import styled from 'styled-components/macro';
import Box from '@mui/material/Box';

export const JournalEntryCardContainer = styled(Box)`
    position: relative;

    :hover {
        cursor: pointer;
    }

    :hover .journalEntryCard{
        opacity: 0.6
    }

    :hover .editButton{
        opacity: 1
    }
`;

export const JournalEntryCardStyled = styled(Box)`
    border: 1px solid grey;
    border-radius: 20px;
    padding: 16px;
    margin: 16px;
    width: 200px;
    height: 150px;
    display: flex;
    align-items: center;
`;