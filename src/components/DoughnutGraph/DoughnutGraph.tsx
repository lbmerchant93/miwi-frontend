import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import styled from 'styled-components/macro'
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    position: relative;
    height: 250px;
    width: 250px;

    :hover .graphContainer{
        opacity: 0.6
    }

    :hover .editButton{
        opacity: 1
    }
`

const DoughnutGraphContainerStyled = styled(Box)`
    opacity: 1;
    transition: .5s ease;
    backface-visibility: hidden;
`;

const EditButtonStyled = styled(Box)`
    transition: .5s ease;
    opacity: 0;
    position: absolute;
    left: 85%;
`;

interface CenterInfoProps {
    name: string;
    percentage: number;
}

const CenterInfo: React.FC<CenterInfoProps> = (props) => {
    const { name, percentage } = props;

    return (
        <>
            {name === 'Water' && <LocalDrinkIcon fontSize="large" style={{ color: "#1ca3ec" }}/>}
            {name === 'Protein' && <RestaurantIcon fontSize="large" color="disabled" />}
            {name === 'Exercise' && <FitnessCenterIcon fontSize="large" style={{ color: "#7FFFD4" }} />}
            {name === 'Kegels' && <SelfImprovementIcon fontSize="large" />}
            {name === 'Garland Pose' && <SelfImprovementIcon fontSize="large" />}
            <Typography variant="body1"><strong>{name}</strong></Typography>
            <Typography variant="body1" mt={-0.5}><strong>{percentage}%</strong></Typography>
        </>
    )
}

interface DoughnutGraphProps {
    name: string;
    completed: number;
    goal: number;
    color: string;
}

const DoughnutGraph: React.FC<DoughnutGraphProps> = (props) => {
    const { name, completed, goal, color } = props;

    const calcPercentage = (completed: number, goal: number) => {
        let percentage = (100 * completed) / goal;
        if (isNaN(percentage)) {
            percentage = 0
        }
        return percentage
    }

    return (
        <Container>
            <DoughnutGraphContainerStyled className="graphContainer">
                <CircularProgressbarWithChildren 
                    value={calcPercentage(completed, goal)}
                    strokeWidth={8}
                    styles={buildStyles({
                        pathColor: `${color}`,
                        trailColor: "#eee"
                    })}
                >
                    {calcPercentage(completed, goal) >= 101 && <Box width={'83%'}>
                        <CircularProgressbarWithChildren
                            value={calcPercentage(completed, goal) - 100}
                            styles={buildStyles({
                                pathColor: `${color}`,
                                trailColor: "#eee"
                            })}
                        >
                            {calcPercentage(completed, goal) >= 201 && <Box width={'83%'}>
                                <CircularProgressbarWithChildren
                                    value={calcPercentage(completed, goal) - 200}
                                    styles={buildStyles({
                                        pathColor: `${color}`,
                                        trailColor: "#eee"
                                    })}
                                >
                                    <CenterInfo name={name} percentage={calcPercentage(completed, goal)} />
                                </CircularProgressbarWithChildren>
                            </Box>}
                            {calcPercentage(completed, goal) <= 200 && <CenterInfo name={name} percentage={calcPercentage(completed, goal)} />}
                        </CircularProgressbarWithChildren>
                    </Box>}
                    {calcPercentage(completed, goal) <= 100 && <CenterInfo name={name} percentage={calcPercentage(completed, goal)} />}
                </CircularProgressbarWithChildren>
            </DoughnutGraphContainerStyled>
            <EditButtonStyled className="editButton">
                <IconButton onClick={() => console.log("edit")} color="inherit">
                    <EditIcon />
                </IconButton>
            </EditButtonStyled>
        </Container>
    )
}

export default DoughnutGraph;