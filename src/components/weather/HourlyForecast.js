import React, {useState} from "react";
import {useSelector} from "react-redux";
import {Container, Col, Row, Button} from "reactstrap";

const HourlyForecast = (props) => {

    const componentName = "HourlyForecast.js";

    const weatherData = useSelector(state => state.weather.weatherData);

    const hourlyForecastWeatherData = weatherData.hourly;
    // console.log(componentName, "hourlyForecastWeatherData", hourlyForecastWeatherData);

    return(
        <Row className="my-4">
        {hourlyForecastWeatherData.map((hourlyForecast, index) => {

            // convert wind speed from m/s to mph
            let windSpeed = (hourlyForecast.wind_speed * 2.23694).toPrecision(2);
            let pressure = (hourlyForecast.pressure * 0.030).toPrecision(4);

            let temperatureFahrenheit = Math.floor(((hourlyForecast.temp - 273.15)*1.8)+32);

            return (
                index % 3 === 0 && index < 12 ? 
                <Col key={index}>
                    <h4>Hour {index + 1}</h4>
                    <p>{hourlyForecast.weather[0].main}</p>
                    <h5>Temperature</h5>
                    <div>
                    {temperatureFahrenheit}&#176;
                    </div>
                    <h5>Humidity</h5>
                    <p> {hourlyForecast.humidity}%</p>
                    <h5>Atmospheric Pressure</h5>
                    <p> {pressure} in</p>
                    <h5>Wind Speed</h5>
                    <p>{windSpeed} mph</p>
                </Col>
                : null
        )
    })}
    </Row>
    )
}

export default HourlyForecast;