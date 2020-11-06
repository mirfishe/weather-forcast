import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import {Container, Col, Row, Alert} from "reactstrap";
import WeatherResults from "./WeatherResults"

const Weather = (props) => {

    const zipCode = useSelector(state => state.location.zipCode);
    const latitude = useSelector(state => state.location.latitude);
    const longitude = useSelector(state => state.location.longitude);
    
    const [errWeatherMessage, setErrWeatherMessage] = useState("");
    const [weatherData, setWeatherData] = useState({});

    const baseURL="https://api.openweathermap.org/data/2.5/weather";
    const key = "203dcab38e74e0dd2117b8d81cc20e68";

    useEffect(() => {
        // console.log("Weather.js useEffect");
        // console.log("Weather.js useEffect zipCode", zipCode);
        // console.log("Weather.js useEffect latitude", latitude);
        // console.log("Weather.js useEffect longitude", longitude);

        let url = "";
        let locationDataAvailable = false;

        if (zipCode !== "") {
            // let url = `${baseURL}?zip=${zipCode}&appid=${key}`&units=metric`;
            url = `${baseURL}?zip=${zipCode}&appid=${key}`;
            locationDataAvailable = true;
        } else if (latitude !== "" && longitude !== "") {
            // let url = `${baseURL}?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`;
            url = `${baseURL}?lat=${latitude}&lon=${longitude}&appid=${key}`;
            locationDataAvailable = true;
        } else {
            locationDataAvailable = false;
        };

        if (locationDataAvailable) {
            fetch(url)
            .then(response => {
                // console.log("Weather.js useEffect response", response);
                if (!response.ok) {
                    throw Error(response.status + " " + response.statusText + " " + response.url);
                } else {
                    return response.json();
                };
            })
            .then(data => {
                console.log("Weather.js useEffect data", data);

                setWeatherData(data);

            })
            .catch(error => {
                console.log("Weather.js useEffect error", error);
                // console.log("Weather.js useEffect error.name", error.name);
                // console.log("Weather.js useEffect error.message", error.message);
                setErrWeatherMessage(error.name + ": " + error.message);
            });

        };

    }, []);

    return(
        <Container className="mt-4">
            <Row>
            {errWeatherMessage !== "" ? <Alert color="danger">{errWeatherMessage}</Alert> : null}
            </Row>

            <Row>
                {/* <span>
                    {JSON.stringify(weatherData)}
                </span> */}
                {weatherData.hasOwnProperty("weather") ? <WeatherResults weatherData={weatherData} /> : null}
            </Row>

        </Container>
    );
};

export default Weather;
