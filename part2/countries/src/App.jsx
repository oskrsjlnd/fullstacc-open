import { useState, useEffect } from 'react'
import axios from 'axios'
import CountryList from './components/CountryList'

const api_key = import.meta.env.VITE_SOME_KEY

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [allCountries, setAllCountries] = useState({})
  const [results, setResults] = useState([null, null])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setAllCountries(response.data)
      })
  }, [])

  const handleTermChange = (event) => {
    const currentTerm = event.target.value
    setSearchTerm(currentTerm)
    if (!results) {
      const result = [calculateResults(currentTerm), null]
      setResults(result)
    } else {
      const countries = calculateResults(currentTerm)
      if (countries.length > 1) {
        setResults([countries, null])
      } else {
        calculateWeather(countries)
      }
    }
  }

  const handleShow = (event) => {
    const currentTerm = event.target.name
    setSearchTerm(currentTerm)
    const country = calculateResults(currentTerm)
    const result = [country, calculateWeather(country)]
    setResults(result)
  }

  const calculateResults = (term) => {
    const result = allCountries.filter((country) =>
      country.name.common
      .toLowerCase()
      .startsWith(
        term.toLowerCase()
      )
    )
    return result
  }

  const calculateWeather = (country) => {
    const lat = country[0].latlng[0]
    const lon = country[0].latlng[1]
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
      .then(response => {
        const result = [country, response.data]
        console.log(result)
        setResults(result)
      })
      .catch(error => {
      })
  }

  console.log('Before app render', results)
  return (
    <div>
      <h1>Countries</h1>
      Term:
      <input
          value={searchTerm}
          onChange={handleTermChange}
      />
      <CountryList 
        countries={results[0]} 
        handleShow={handleShow}
        weatherData={results[1]}
      />
    </div>
  )
}

export default App