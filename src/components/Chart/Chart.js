

import { useEffect, useState } from "react"
import { Line, Bar } from 'react-chartjs-2';
import moment from "moment"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
  
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

ChartJS.defaults.scales.linear.min = 0;

export function Chart(props){
    const daysCount = props.month.startOf('month').daysInMonth();

    const data = {
      labels: [...Array(daysCount)].map((e,i) => i + 1),
      
      datasets: [
        {
          label: 'Count',
          data: [...Array(daysCount)].map((e,i) => {
            const day = props.month.clone().add(i, 'day');
            return props.getDataEntry(day)?.count || 0
          }),
          
          fill: true,
          lineTension: 0,
          backgroundColor: "#c67284",
          borderColor: "#c67284",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "#c67284",
          pointBackgroundColor: "#FFF",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "#2f3640",
          pointHoverBorderColor: "#c67284",
          pointHoverBorderWidth: 2,
          pointRadius: 2,
          pointHitRadius: 10,
        }    
      ]    
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        title: { text: "", display:true },
        scales: {
            y: {
              suggestedMin: 0,
              scaleLabel: {
                    display: true,
                    labelString: 'Count'
              },
              ticks: {
                min: 0,
                stepSize: 1
              }
            },
            x: {
                scaleLabel: {
                    display: true,
                    labelString: 'Days'
                }
            }
        }
    };

    return (<div className="cal-container cal-chart-container">
                <div className="cal-chart">
                <Line data = {data} options = {options} />
                </div>
            </div>)
}