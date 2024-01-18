const Weather = ({ weatherData }) => {
    if (!weatherData) {
        return (
            <div>
                <h2>Weather information</h2>
            </div>
        )
    } else {
        const iconUrl = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
        const imgStyle = {
            width: '30%',
            height: 'auto'
        }
        return (
            <div>
                <h2>Weather in {weatherData.name} </h2>
                <p>temperature {weatherData.main.temp} Celsius</p>
                <img style={imgStyle} src={iconUrl} alt='Weather icon'/>
                <p>wind {weatherData.wind.speed} m/s</p>
            </div>
        )
    }
}

export default Weather