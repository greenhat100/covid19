import axios from 'axios';

// Alternative API endpoint if original is down
const url = 'https://disease.sh/v3/covid-19';

export const fetchData = async (country) => {
    let changeableURL = `${url}/all`; // Default global data

    if (country) {
        changeableURL = `${url}/countries/${country}`;
    }

    try {
        const { data } = await axios.get(changeableURL);
        return {
            confirmed: data.cases,
            recovered: data.recovered,
            deaths: data.deaths,
            lastUpdate: data.updated,
        };
    } catch (error) {
        console.error("Error fetching COVID data:", error);
        return null;
    }
};

export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/historical/all?lastdays=30`);
        if (!data.cases) return [];

        return Object.keys(data.cases).map((date) => ({
            date,
            confirmed: data.cases[date],
            deaths: data.deaths[date],
        }));
    } catch (error) {
        console.error("Error fetching daily data:", error);
        return [];
    }
};

export const fetchCountries = async () => {
    try {
        const { data } = await axios.get(`${url}/countries`);
        return data.countries?.map((country) => country.country) || [];
    } catch (error) {
        console.error("Error fetching countries:", error);
        return [];
    }
};
