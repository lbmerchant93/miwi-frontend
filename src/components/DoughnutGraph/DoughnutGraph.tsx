import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

ChartJS.register(ArcElement, Tooltip, Legend);

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
                        <LocalDrinkIcon fontSize="large" color="info"/>
                        <Box mt={1}>
                            <Typography variant="body1"><strong>{name}</strong></Typography>
                        </Box>
                    {/* </CircularProgressbarWithChildren> */}
                </Box>
            </CircularProgressbarWithChildren>
        </Box>
    )
}

export default DoughnutGraph;