import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { motion } from 'framer-motion';

ChartJS.register(ArcElement, Tooltip, Legend);

const SkillsChart = ({ matching, missing }) => {
  const total = matching + missing;
  const matchPercent = Math.round((matching / total) * 100);
  
  const data = {
    labels: ['Matching Skills', 'Missing Skills'],
    datasets: [
      {
        data: [matching, missing],
        backgroundColor: ['#00b894', '#ff7675'],
        borderColor: ['#fff', '#fff'],
        borderWidth: 2,
        hoverOffset: 10
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '75%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            size: 14,
            family: "'Inter', sans-serif"
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    },
  };

  return (
    <motion.div 
      className="skills-chart"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="chart-container">
        <Doughnut data={data} options={options} />
        <div className="chart-center-text">
          <span>{matchPercent}%</span>
          <small>Match</small>
        </div>
      </div>
    </motion.div>
  );
};

export default SkillsChart;