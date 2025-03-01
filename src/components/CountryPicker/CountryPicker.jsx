import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';
import styles from './CountryPicker.module.css';
import { fetchCountries } from '../../api';

const CountryPicker = ({ handleCountryChange }) => { 
    const [fetchedCountries, setFetchedCountries] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            try {
                const countries = await fetchCountries();
                setFetchedCountries(countries || []); // Ensure it's always an array
            } catch (error) {
                console.error("Error fetching countries:", error);
                setFetchedCountries([]); // Fallback to empty array on error
            }
        };
        fetchAPI();
    }, []); // Removed unnecessary `setFetchedCountries` dependency

    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
                <option value="">Global</option>
                {fetchedCountries?.map((country, i) => (
                    <option key={i} value={country}>{country}</option>
                ))}
            </NativeSelect>
        </FormControl>
    );
}

export default CountryPicker;
