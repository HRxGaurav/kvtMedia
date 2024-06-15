import React, { useEffect, useState } from 'react';
import style from './Graph.module.css';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import CryptoPrices from './CryptoPrices';

const Graph = () => {
  const [chartData, setChartData] = useState(null);
  const [chartHeight, setChartHeight] = useState(80); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://datausa.io/api/data?drilldowns=Nation&measures=Population');
        const data = await response.json();

        if (data && data.data) {
          const sortedData = data.data.sort((a, b) => a.Year - b.Year);
          const years = sortedData.map(item => item.Year);
          const populations = sortedData.map(item => item.Population);

          setChartData({
            labels: years,
            datasets: [
              {
                label: 'USA',
                data: populations,
                borderColor: '#6a8814',
                backgroundColor: 'rgba(106, 136, 20, 0.2)',
                fill: false,
              },
            ],
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
    
      if (screenWidth >= 1024) {
        
        setChartHeight(350);
      } else if (screenWidth >= 768) {
        
        setChartHeight(350);
      } else {
        
        setChartHeight(350);
      }
    };
    

    handleResize(); 

    window.addEventListener('resize', handleResize); 

    return () => {
      window.removeEventListener('resize', handleResize); 
    };
  }, []);

  const options = {
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#ffffff',
        },
      },
    },
    scales: {
      x: {
        title: {
          display: false,
          text: 'Year',
          color: '#4c5351',
        },
        ticks: {
          color: '#4c5351',
        },
      },
      y: {
        title: {
          display: false,
          text: 'Population',
          color: '#4c5351',
        },
        ticks: {
          color: '#4c5351',
        },
      },
    },
  };

  if (!chartData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={style.graphDiv}>
        <h2 className={style.graphText}>Population in US</h2>
        <div style={{ position: 'relative', height: `${chartHeight}px`, width: '100%' }}>
        <Line data={chartData} options={{ ...options, maintainAspectRatio: false }} />
        </div>
      </div>
      <CryptoPrices />
      </>
  );
};

export default Graph;
