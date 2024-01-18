import Country from "./Country"

const CountryList = ({ countries, handleShow, weatherData }) => {
    const countryStyle = {
      listStyle: 'none',
      marginLeft: '-38px'
    }
    if (countries === null) {
      return (
        <p>Enter search term</p>
        )
      } else if (countries.length > 10) {
        return (
          <p>Too many matches, try to narrow it down</p>
          )
    } else if (countries.length === 0) {
      return (
        <p>No results found</p>
      )
    } else if (countries.length === 1) {
      return (
        <>
          <Country weatherData={weatherData} country={countries[0]} />
        </>
      )
    } else {
      return (
        <ul>
          {countries.map(country =>
            <li key={country.name.official} style={countryStyle}>
              {country.name.common}
              <button name={country.name.common} onClick={handleShow}>show</button>
            </li>
          )}
        </ul>
      )
    }
}

export default CountryList