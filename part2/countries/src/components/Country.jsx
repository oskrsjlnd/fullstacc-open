import Weather from "./Weather"

const Country = ({ country, weatherData }) => {
    const listStyle = {
        listStyle: 'none',
        marginLeft: '-38px'
    }
    const flagStyle = {
        maxWidth: '30%',
        height: 'auto'
    }

    const langToArray = (languages) => {
        return Object.entries(languages).map(lang => lang[1])
    }
    console.log('before rendering country', weatherData)
    return (
        <>
            <h2>{country.name.common}</h2>
            <div>
                <ul>
                    <li key={country.capital} style={listStyle}>capital {country.capital}</li>
                    <li key={country.area} style={listStyle}>area {country.area}</li>
                </ul>
            </div>
            <div>
                <b>languages:</b>
                <ul>
                    {langToArray(country.languages).map(language =>
                        <li key={language}>{language}</li>
                    )}
                </ul>
            </div>
            <div>
                <img style={flagStyle} src={country.flags.svg} alt="country flag" />
            </div>
            <Weather weatherData={weatherData} />
        </>
    )
}
export default Country