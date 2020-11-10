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

    return(
        <Col className="mt-4">
            <h4>{currentWeatherData.weather[0].main}</h4>
            <h5>Temperature <span className="ml-2 smallerText">{temperatureFahrenheit}&#176;</span></h5>
            <h5>Humidity <span className="ml-2 smallerText">{currentWeatherData.main.humidity}%</span></h5>
            <h5>Atmospheric Pressure <span className="ml-2 smallerText">{pressure} in</span></h5>
            <h5>Wind Speed <span className="ml-2 smallerText">{windSpeed} mph</span></h5>
        </Col>
    )
}

export default CurrentWeatherZipCode;