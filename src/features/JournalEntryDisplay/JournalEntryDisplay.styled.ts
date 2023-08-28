import styled from 'styled-components/macro';
import Box from '@mui/material/Box';

export const GraphContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    position: relative;
    height: 250px;
    width: 250px;

    :hover {
        cursor: pointer;
    }

    :hover .graphContainer{
        opacity: 0.6
    }

    :hover .editButton{
        opacity: 1
    }
`;

export const CheckBoxContainer = styled(Box)`
    display: flex;
    justify-content: space-around;
    align-items: center;
    border: rgb(0 0 0 / 20%) solid 1px;
    box-shadow: 11px 11px 7px -4px rgb(0 0 0 / 20%);

    :hover {
        cursor: pointer;
    }

    :hover .checkBoxSection{
        opacity: 0.6
    }

    :hover .editButton{
        opacity: 1
    }
`;

export const CheckBoxSection = styled(Box)`
    opacity: 1;
    display: flex;
    flex-direction: row;
`;

export const MoodContainer = styled(Box)`
    border: rgb(0 0 0 / 20%) solid 1px;
    box-shadow: 11px 11px 7px -4px rgb(0 0 0 / 20%);

    :hover {
        cursor: pointer;
    }

    :hover .moodSection{
        opacity: 0.6
    }

    :hover .editButton{
        opacity: 1
    }
`;

export const MoodSection = styled(Box)`
    display: flex;
    flex-direction: column;
    height: 92px;
`;

export const WritingContainer = styled(Box)`
    position: relative;

    :hover {
        cursor: pointer;
    }

    :hover .writingSection{
        opacity: 0.6
    }

    :hover .editButton{
        opacity: 1
    }
`;

export const WritingSection = styled(Box)`
    height: 325px;
    width: 325px;
`;

export const WritingSectionContainer = styled(Box)`
    border: rgb(0 0 0 / 20%) solid 1px;
    box-shadow: 11px 11px 7px -4px rgb(0 0 0 / 20%);
`;

export const EditButtonContainer = styled(Box)`
    transition: .5s ease;
    opacity: 0;
    position: absolute;
    left: 90%;
`;