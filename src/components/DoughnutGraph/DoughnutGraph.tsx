import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


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
        <Box>
            <CircularProgressbarWithChildren 
                value={calcPercentage(completed, goal)}
                strokeWidth={8}
                styles={buildStyles({
                    pathColor: `${color}`,
                    trailColor: "#eee"
                })}
            >
                <Box width={'83%'}>
                    {/* <CircularProgressbarWithChildren
                        value={0}
                        styles={buildStyles({
                        // trailColor: "transparent"
                        })}
                    > */}
                        {name === 'Water' && <LocalDrinkIcon fontSize="large" color="info"/>}
                        {name === 'Protein' && <RestaurantIcon fontSize="large" color="disabled" />}
                        {name === 'Exercise' && <FitnessCenterIcon fontSize="large" color="success" />}
                        {name === 'Kegels' && <SelfImprovementIcon fontSize="large" />}
                        {name === 'Garland Pose' && <SelfImprovementIcon fontSize="large" />}
                        <Typography variant="body1"><strong>{name}</strong></Typography>
                        <Typography variant="body1" mt={-0.5}><strong>{calcPercentage(completed, goal)}%</strong></Typography>
                    {/* </CircularProgressbarWithChildren> */}
                </Box>
            </CircularProgressbarWithChildren>
        </Box>
    )
}

export default DoughnutGraph;