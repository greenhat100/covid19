import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { fetchDailyData } from '../../api';

// ✅ Register required components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Chart = () => {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            const data = await fetchDailyData();
            if (data) {
                setDailyData(data);
            }
        };
        fetchAPI();
    }, []);

    const lineChart = dailyData.length ? (
        <Line
            data={{
                labels: dailyData.map(({ date }) => date),
                datasets: [
                    {
                        data: dailyData.map(({ confirmed }) => confirmed),
                        label: 'Infected',
                        borderColor: '#3333ff',
                        fill: true,
                    },
                    {
                        data: dailyData.map(({ deaths }) => deaths),
                        label: 'Deaths',
                        borderColor: 'red',
                        backgroundColor: 'rgba(255, 0, 0, 0.5)',
                        fill: true,
                    },
                ],
            }}
        />
    ) : (
        <p>Loading...</p>
    );

    return <div>{lineChart}</div>;
};

export default Chart;
