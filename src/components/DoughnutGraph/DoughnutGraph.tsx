import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutGraphProps {
    name: string;
    completed: number;
    goal: number;
}

const DoughnutGraph: React.FC<DoughnutGraphProps> = (props) => {
    const { name, completed, goal } = props;

    console.log(completed, 'completed')
    console.log(goal, "goal")

    const chartData = [completed, (goal - completed)];
    const data1 = {
        datasets: [
            {
            data: chartData,
            backgroundColor: ["#0188D1", "#707070"]
            }
        ]
    };

    const options = {
        responsive: true,
        legend: {
          display: false,
          position: "bottom",
          labels: {
            fontSize: 18,
            fontColor: "#6D7278",
            fontFamily: "kanit light"
          }
        }      
    }

    const plugins = [{
        id: `${name}-id`,
        beforeDraw: function(chart: any) {
         var width = chart.width,
             height = chart.height,
             ctx = chart.ctx;
             ctx.restore();
             var fontSize = (height / 160).toFixed(2);
             ctx.font = fontSize + "em sans-serif";
             ctx.textBaseline = "middle";
             var text = `${calcPercentage(completed, goal)}`,
             textX = Math.round((width - ctx.measureText(text).width) / 2),
             textY = height / 2;
             ctx.fillText(text, textX, textY);
             ctx.save();
        } 
      }]


    const calcPercentage = (completed: number, goal: number) => {
        let percentage = (100 * completed) / goal;
        if (isNaN(percentage)) {
            percentage = 0
        }
        return `${percentage}%`
    }

    return (
        <Doughnut data={data1} options={options} height={250} plugins={plugins}/>
    )
}

export default DoughnutGraph;