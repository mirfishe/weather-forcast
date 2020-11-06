import React, {useState} from "react";
import {useSelector} from "react-redux";
import {Container, Col, Row, Button} from "reactstrap";

const FiveDayForecast = (props) => {

    const weatherData = useSelector(state => state.weather.weatherData);

    const dailyForecastWeatherData = weatherData.daily;
    // console.log("WeatherResults.js dailyForecastWeatherData", dailyForecastWeatherData);

    return(
        <Row>
        {dailyForecastWeatherData.map((dailyForecast, index) => {

            // convert wind speed from m/s to mph
            let windSpeed = (dailyForecast.wind_speed * 2.23694).toPrecision(2);
            let pressure = (dailyForecast.pressure * 0.030).toPrecision(4);

            let dailyHighTemperatureFahrenheit = Math.floor(((dailyForecast.temp.max - 273.15)*1.8)+32);
            let dailyLowTemperatureFahrenheit = Math.floor(((dailyForecast.temp.min - 273.15)*1.8)+32);

            return (
                index < 5 ? 
                <Col key={index}>
                    <h4>Day {index + 1}</h4>
                    <p>{dailyForecast.weather[0].main}</p>
                    <h5>Temperature</h5>
                    <div>
                    High {dailyHighTemperatureFahrenheit}&#176;
                    </div>
                    <div>
                    Low {dailyLowTemperatureFahrenheit}&#176;
                    </div>
                    <h5>Humidity</h5>
                    <p> {dailyForecast.humidity}%</p>
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

export default FiveDayForecast;