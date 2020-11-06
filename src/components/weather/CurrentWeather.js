import React, {useState} from "react";
import {useSelector} from "react-redux";
import {Container, Col, Row, Button} from "reactstrap";

const CurrentWeather = (props) => {

    // console.log("WeatherResults.js props", props);
    // console.log("WeatherResults.js props.weatherData", props.weatherData);
    // let weatherData = props.weatherData;
    // console.log("WeatherResults.js weatherData", weatherData);

    const weatherData = useSelector(state => state.weather.weatherData);

    const currentWeatherData = weatherData.current;
    // console.log("WeatherResults.js currentWeatherData", currentWeatherData);

    // convert wind speed from m/s to mph
    let windSpeed = (currentWeatherData.wind_speed * 2.23694).toPrecision(2);
    let pressure = (currentWeatherData.pressure * 0.030).toPrecision(4);

    // const [temperatureKelvin, setTemperatureKelvin] = useState(weatherData.main.temp);
    const [temperatureFahrenheit, setTemperatureFahrenheit] = useState(Math.floor(((currentWeatherData.temp - 273.15) * 1.8) + 32));
    const [temperatureCelsius,  setTemperatureCelsius] = useState(Math.floor(currentWeatherData.temp - 273.15));
    const [temperatureType,  setTemperatureType] = useState('Fahrenheit');

    return(
        <Col>
                <h4>{weatherData.timezone}</h4>
                <p><strong>Currently</strong> {currentWeatherData.weather[0].main}</p>
                <h5>Temperature</h5>
                { temperatureType === 'Fahrenheit' ? 
                <div>
                {temperatureFahrenheit}&#176; <Button className="ml-2" color="primary" size="sm" onClick={() => {setTemperatureType('Celsius')}}>Change to &deg;C</Button> 
                </div>
                :
                <div>
                {temperatureCelsius}&#176; <Button className="ml-2" color="secondary" size="sm" onClick={() => {setTemperatureType('Fahrenheit')}}>Change to &deg;F</Button>
                </div>
                }
                <h5>Humidity</h5>
                <p> {currentWeatherData.humidity}%</p>
                <h5>Atmospheric Pressure</h5>
                <p> {pressure} in</p>
                <h5>Wind Speed</h5>
                <p>{windSpeed} mph</p>

        </Col>
    )
}

export default CurrentWeather;