import React from 'react';
import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';
import { fetchData } from './api';

class App extends React.Component{
    state ={
        data: {},
        country: '',
    }
    

    async componentDidMount() {
       const fetchedData = await fetchData();
       this.setState({ data: fetchedData});
       console.log(fetchedData);

    }
    handleCountryChange = async (country) => {
      //set data & state
      
      const fetchedData = await fetchData(country);
      //console.log(fetchedData);
      this.setState({ data: fetchedData, country: country });
    }
    render() {
        const { data, country } = this.state;
        return (
            <div className={styles.container}>
            <h1>Covid-19 Tracker</h1>
               <Cards data={data}/>
               <CountryPicker handleCountryChange={this.handleCountryChange} />
               <Chart data={data} country={country} />

            </div>
        )
    }
}
export default App;