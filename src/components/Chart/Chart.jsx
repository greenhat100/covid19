import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { fetchDailyData } from '../../api';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Chart = () => {
    const [dailyData, setDailyData] = useState([]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    useEffect(() => {
        const fetchAPI = async () => {
            const fetchedData = await fetchDailyData(selectedYear);
            setDailyData(fetchedData);
        };
        fetchAPI();
    }, [selectedYear]);

    const handleYearChange = (event) => {
        setSelectedYear(parseInt(event.target.value));
    };

    const years = [2020, 2021, 2022, 2023, 2024]; // Modify as needed

    return (
        <div>
            <h2>COVID-19 Data for {selectedYear}</h2>

            {/* Dropdown for selecting years */}
            <select onChange={handleYearChange} value={selectedYear}>
                {years.map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>

            {dailyData.length ? (
                <Line
                    data={{
                        labels: dailyData.map(({ date }) => date),
                        datasets: [
                            {
                                data: dailyData.map(({ confirmed }) => confirmed),
                                label: 'Infected',
                                borderColor: '#3333ff',
                                backgroundColor: 'rgba(51, 51, 255, 0.5)',
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
                    options={{
                        responsive: true,
                        plugins: {
                            legend: { position: 'top' },
                            title: { display: true, text: `COVID-19 Cases in ${selectedYear}` },
                        },
                    }}
                />
            ) : (
                <p>Loading data...</p>
            )}
        </div>
    );
};

export default Chart;
