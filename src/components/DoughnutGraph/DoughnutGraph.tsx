import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutGraphProps {

}
const DoughnutGraph: React.FC<DoughnutGraphProps> = (props) => {

    return (
        <div>DoughnutGraph</div>
    )
}

export default DoughnutGraph;