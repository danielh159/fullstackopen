import React from 'react'
import CountryData from './CountryData'

const Countries = (props) => {
  if (props.countryFilter === ('')) {
    return null
  } else if (props.filterCountries.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  } else if (props.filterCountries.length !== 1) {
    return (
      props.filterCountries.map(country =>
        <div key={country.name}>
          {country.name}
          <button onClick={props.handleShowCountry}>show</button>
        </div>
      )
    )
  } else {
    return (
      <CountryData
        filterCountries={props.filterCountries}
        setWeather={props.setWeather}
        countryFilter={props.countryFilter}
        weather={props.weather}
      />
    )
  }
}

export default Countries