import React, {useState} from "react";
import {useSelector} from "react-redux";
import {Container, Col, Row, Button} from "reactstrap";

const CurrentWeatherZipCode = (props) => {

    const componentName = "CurrentWeatherZipCode.js";

    // console.log(componentName, "props", props);
    // console.log(componentName, "props.weatherData", props.weatherData);
    // let weatherData = props.weatherData;
    // console.log(componentName, "weatherData", weatherData);

    const currentWeatherData = useSelector(state => state.weather.weatherData);
    // console.log(componentName, "currentWeatherData", currentWeatherData);

    // convert wind speed from m/s to mph
    let windSpeed = (currentWeatherData.wind.speed * 2.23694).toPrecision(2);
    let pressure = (currentWeatherData.main.pressure * 0.030).toPrecision(4);

    // const [temperatureKelvin, setTemperatureKelvin] = useState(weatherData.main.temp);
    const [temperatureFahrenheit, setTemperatureFahrenheit] = useState(Math.floor(((currentWeatherData.main.temp - 273.15) * 1.8) + 32));
    const [temperatureCelsius,  setTemperatureCelsius] = useState(Math.floor(currentWeatherData.main.temp - 273.15));
    const [temperatureType,  setTemperatureType] = useState('Fahrenheit');

    return(
        <Col>
                <h4>{currentWeatherData.name}</h4>
                <p><strong>Currently</strong> {currentWeatherData.weather[0].main}</p>
                <h5>Temperature</h5>
                {/* { temperatureType === 'Fahrenheit' ?  */}
                <div>
                {temperatureFahrenheit}&#176; {/* <Button className="ml-2" color="primary" size="sm" onClick={() => {setTemperatureType('Celsius')}}>Change to &deg;C</Button> */}
                </div>
                {/* :
                <div>
                {temperatureCelsius}&#176; <Button className="ml-2" color="secondary" size="sm" onClick={() => {setTemperatureType('Fahrenheit')}}>Change to &deg;F</Button>
                </div>
                }  */}
                <h5>Humidity</h5>
                <p> {currentWeatherData.main.humidity}%</p>
                <h5>Atmospheric Pressure</h5>
                <p> {pressure} in</p>
                <h5>Wind Speed</h5>
                <p>{windSpeed} mph</p>

        </Col>
    )
}

export default CurrentWeatherZipCode;