import React, { useEffect, useRef, useState } from 'react';
import Chart, { ChartConfiguration } from 'chart.js/auto';
import { User } from '../../types/studentTypes';

const PieChart = ({ students } : { students: User[] }) => {

  const [noOfStudents, setNoOfStudents] = useState<number[]>([0, 0, 0, 0]);

  //Set Student Number
  useEffect(() => {
    if(students.length > 0) {
      let firstYr = students.filter(stud => stud.yearLevel === 1).length;
      let secondYr = students.filter(stud => stud.yearLevel === 2).length;
      let thirdYr = students.filter(stud => stud.yearLevel === 3).length;
      let fourthYr = students.filter(stud => stud.yearLevel === 4).length;
      setNoOfStudents([firstYr, secondYr, thirdYr, fourthYr]);
    }

  }, [students]);
  
  // console.log(noOfStudents);

  const chartRef = useRef<HTMLCanvasElement | null>(null); 
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      if (ctx) {
        
        const config: ChartConfiguration<'pie', number[], string> = {
          type: 'pie',
          data: {
            labels: ['1st Year', '2nd Year', '3rd Year', '4th Year'],
            datasets: [
              {
                label: 'Students',
                data: [noOfStudents[0], noOfStudents[1], noOfStudents[2], noOfStudents[3]],
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
  }, [noOfStudents]);

  return (
    <canvas ref={chartRef} width={320} height={320} style={{ display: 'block'}} />
  );
};

export default PieChart;
