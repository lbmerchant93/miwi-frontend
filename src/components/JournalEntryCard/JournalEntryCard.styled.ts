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
    border: rgb(0 0 0 / 20%) solid 1px;
    box-shadow: 11px 11px 7px -4px rgb(0 0 0 / 20%);
    border-radius: 20px;
    padding: 16px;
    margin: 16px;
    width: 200px;
    height: 150px;
    display: flex;
    align-items: center;
`;

export const EditButtonContainer = styled(Box)`
    transition: .5s ease;
    opacity: 0;
    position: absolute;
    left: 77%;
    top: 8%;
`;