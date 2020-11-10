import React, {useState} from "react";
import {useSelector} from "react-redux";
import {Container, Col, Row, Button} from "reactstrap";

const FiveDayForecast = (props) => {

    const componentName = "FiveDayForecast.js";

    const weatherData = useSelector(state => state.weather.weatherData);

    const dailyForecastWeatherData = weatherData.daily;
    // console.log(componentName, "dailyForecastWeatherData", dailyForecastWeatherData);

    const calculateDay = (forecastIndex) => {

        let currentDate = new Date();
        let currentDay = currentDate.getDay();
        console.log(componentName, "currentDay", currentDay);

        let weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let dayForecast = currentDay + forecastIndex + 1; // To account for the index starting at zero.

        // Account for numbers over 7 days
        // dayForecast +=  7;
        if (dayForecast > 6) {
            dayForecast = dayForecast - 7;
        };

        return weekDays[dayForecast];
    };

    return(
        <Row className="my-4">
        {dailyForecastWeatherData.map((dailyForecast, index) => {

            // convert wind speed from m/s to mph
            let windSpeed = (dailyForecast.wind_speed * 2.23694).toPrecision(2);
            let pressure = (dailyForecast.pressure * 0.030).toPrecision(4);

            let dailyHighTemperatureFahrenheit = Math.floor(((dailyForecast.temp.max - 273.15)*1.8)+32);
            let dailyLowTemperatureFahrenheit = Math.floor(((dailyForecast.temp.min - 273.15)*1.8)+32);

            return (
                index < 5 ? 
                <Col key={index}>
                    <h3>{calculateDay(index)}</h3>
                    <h4>{dailyForecast.weather[0].main}</h4>
                    <h5>Temperature</h5>
                    <div className="ml-2">High {dailyHighTemperatureFahrenheit}&#176;</div>
                    <div className="ml-2 mb-2">Low {dailyLowTemperatureFahrenheit}&#176;</div>
                    <h5>Humidity <span className="ml-2 smallerText">{dailyForecast.humidity}%</span></h5>
                    <h5>Atmospheric Pressure <span className="ml-2 smallerText">{pressure} in</span></h5>
                    <h5>Wind Speed <span className="ml-2 smallerText">{windSpeed} mph</span></h5>
                </Col>
                : null
        )
    })}
    </Row>
    )
}

export default FiveDayForecast;