import React from 'react'
import Weather from './Weather'

const CountryData = (props) => {
  const country = props.filterCountries[0]

  return (
    <div>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h2>Spoken languages</h2>
      <ul>
        {country.languages.map(language =>
          <li key={language.name}>{language.name}</li>
        )}
      </ul>
      <img src={country.flag} width='110' />
      <Weather
        country={country}
        setWeather={props.setWeather}
        countryFilter={props.countryFilter}
        weather={props.weather}
      />
    </div>
  )
}

export default CountryData