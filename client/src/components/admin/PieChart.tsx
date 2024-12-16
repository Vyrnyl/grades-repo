import React, { useEffect, useRef } from 'react';
import Chart, { ChartConfiguration } from 'chart.js/auto';

const PieChart: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null); // Type the canvas ref
  const chartInstance = useRef<Chart | null>(null); // Type the Chart.js instance

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy(); // Destroy previous chart instance if it exists
    }
    
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d'); // Get the canvas 2D context

      if (ctx) {
        // Chart.js configuration
        const config: ChartConfiguration<'pie', number[], string> = {
          type: 'pie',
          data: {
            labels: ['1st Year', '2nd Year', '3rd Year', '4th Year'],
            datasets: [
              {
                label: 'Students',
                data: [12, 19, 3, 5],
                backgroundColor: [
                  'rgba(45, 85, 247, 0.6)',
                  'rgba(247, 136, 45, 0.6)',
                  'rgba(145, 145, 142, 0.6)',
                  'rgba(242, 242, 19, 0.6)',
                ],
                borderColor: [
                  'rgba(227, 225, 225)'
                ],
                borderWidth: 2,
              },
            ],
          },
          options: {
            responsive: false,
            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                    font: {
                        size: 12
                    },
                    boxHeight: 10,
                    boxWidth: 10
                }
              },
              tooltip: {
                enabled: true,
              },
            },
          },
        };

        chartInstance.current = new Chart(ctx, config);
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <canvas ref={chartRef} width={320} height={320} style={{ display: 'block'}} />
  );
};

export default PieChart;
