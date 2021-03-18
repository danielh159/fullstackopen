import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Countries from './components/Countries'
import axios from 'axios'

const App = () => {

  const [countries, setCountries] = useState([])
  const [countryFilter, setFilter] = useState('')
  const [weather, setWeather] = useState([])

  // Get country data
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data))
  }, [])

  // Returns a new array that contains country data with name properties
  // that contain whatever is entered in the input field)
  const filterCountries = countries.filter(country =>
    country.name.toLowerCase().includes(countryFilter.toLowerCase())
  )
  // Sets countryFilter to the value of form's input field
  const filterChange = (event) => {
    setFilter(event.target.value)
  }
  // Event handler that sets filter to the name of the respective country
  // in order to view that one country's details (does not apply to country
  // names that contain other country names i.e South Sudan & Sudan
  const handleShowCountry = (event) => {
    setFilter(event.nativeEvent.path[1].childNodes[0].data.toLowerCase())
  }

  return (
    <div>
      <Filter
        countryFilter={countryFilter}
        filterChange={filterChange}
      />
      <Countries
        countryFilter={countryFilter}
        filterCountries={filterCountries}
        handleShowCountry={handleShowCountry}
        setWeather={setWeather}
        weather={weather}
      />
    </div>
  )
}

export default App