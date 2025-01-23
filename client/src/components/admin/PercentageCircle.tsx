import { useEffect, useRef } from 'react';
import Chart, { ChartConfiguration } from 'chart.js/auto';

const PercentageCircle = ({ active, inactive} : { active: number, inactive: number }) => {

  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      if (ctx) {
        const config: ChartConfiguration<'doughnut', number[], string> = {
          type: 'doughnut',
          data: {
            labels: ['Active', 'Inactive'],
            datasets: [
              {
                label: 'Users',
                data: [active, inactive - active - 1],
                backgroundColor: [
                  'rgba(36, 201, 127, 0.6)',
                  'rgba(162, 166, 162, 0.6)',
                ],
                borderColor: 'white',
                borderWidth: 0,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              tooltip: {
                enabled: true,
              },
              legend: {
                position: 'top',
                display: false,
              },
              
            },
            cutout: '90%',
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
  }, [active, inactive]);

  return (
    <canvas
        ref={chartRef}
        width={300}
        height={300}
        style={{ display: 'block' }}
      />
  );
};

export default PercentageCircle;
