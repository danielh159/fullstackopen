import React, { useEffect } from 'react'
import axios from 'axios'

const Weather = (props) => {
  // Get weather data
  useEffect(() => {
    // Params will be plugged in to the api url that contains data
    // being retrieved
    const params = {
      // Value of access key is stored in REACT_APP_API_KEY, a variable that
      // was set when dev server was started in terminal
      access_key: process.env.REACT_APP_API_KEY,
      // Requesting weather data for the country that was filtered
      query: props.country.capital
    }
    axios
      // Plug in properties and values from the params object into url
      .get('http://api.weatherstack.com/current', {params})
      // Going no further from data property should be sufficient so that name
      // property can be accessed
      .then(response => props.setWeather(response.data.current))
      // API subscription changes when the values of the filter state
      // is changed
  }, [props.countryFilter])

  return (
    <div>
      <h2>Weather in {props.country.capital}</h2>
      <div>
        <strong>temperature:</strong> {props.weather.temperature} Celcius
      </div>
      <img src={props.weather.weather_icons} width='66' />
      <div>
        <strong>wind:</strong> {props.weather.wind_speed} mph direction {props.weather.wind_dir}
      </div>
    </div>
  )
}

export default Weather