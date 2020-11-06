import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Container, Col, Row, Alert} from "reactstrap";
import {setWeatherData, setCurrentWeather, setHourlyForecast, setDailyForecast} from "../../app/weatherSlice";
import CurrentWeather from "./CurrentWeather"
import HourlyForecast from "./HourlyForecast"
import FiveDayForecast from "./FiveDayForecast"
import WeatherDataOneCall from "./WeatherDataOneCall.json";

const Weather = (props) => {

    const appOffline = true;

    const dispatch = useDispatch();

    const zipCode = useSelector(state => state.location.zipCode);
    const latitude = useSelector(state => state.location.latitude);
    const longitude = useSelector(state => state.location.longitude);
    
    const [errWeatherMessage, setErrWeatherMessage] = useState("");
    // const [weatherData, setWeatherData] = useState({});
    const weatherData = useSelector(state => state.weather.weatherData);

    // Current weather data
    // For latitude and longitude plus zip code
    // const baseURL="https://api.openweathermap.org/data/2.5/weather";

    // One Call API
    // Current and forecast weather data
    // Only for latitude and longitude
    // https://openweathermap.org/api/one-call-api
    const baseURL="https://api.openweathermap.org/data/2.5/onecall";
    const key = "203dcab38e74e0dd2117b8d81cc20e68";

    useEffect(() => {
        // console.log("Weather.js useEffect");
        // console.log("Weather.js useEffect zipCode", zipCode);
        // console.log("Weather.js useEffect latitude", latitude);
        // console.log("Weather.js useEffect longitude", longitude);

        // console.log("Weather.js useEffect appOffline", appOffline);

        if (!appOffline) {
            let url = "";
            let locationDataAvailable = false;

            if (zipCode !== "") {
                // let url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${key}`&units=metric`;
                url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${key}`;
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

                    // For current weather data
                    // setWeatherData(data);

                    // For current and forecast weather data / One Call API 
                    dispatch(setWeatherData(data));
                    // dispatch(setCurrentWeather(data.current));
                    // dispatch(setHourlyForecast(data.hourly));
                    // dispatch(setDailyForecast(data.daily));

                })
                .catch(error => {
                    console.log("Weather.js useEffect error", error);
                    // console.log("Weather.js useEffect error.name", error.name);
                    // console.log("Weather.js useEffect error.message", error.message);
                    setErrWeatherMessage(error.name + ": " + error.message);
                });

            };

        } else {
            // console.log("Weather.js useEffect WeatherDataOneCall", WeatherDataOneCall);
            // setWeatherData(WeatherDataOneCall);
            dispatch(setWeatherData(WeatherDataOneCall));
            // dispatch(setCurrentWeather(WeatherDataOneCall.current));
            // dispatch(setHourlyForecast(WeatherDataOneCall.hourly));
            // dispatch(setDailyForecast(WeatherDataOneCall.daily));
        };

    }, []);

    return(
        <Container className="mt-4">
            <Row>
            {errWeatherMessage !== "" ? <Alert color="danger">{errWeatherMessage}</Alert> : null}
            </Row>

            <Row className="my-4">
                {/* For current weather data */}
                {weatherData.hasOwnProperty("weather") ? <CurrentWeather /> : null}
                {/* For current and forecast weather data / One Call API */}
                {weatherData.hasOwnProperty("timezone") ? <CurrentWeather /> : null}
            </Row>

            <Row className="my-4">
                {/* For current and forecast weather data / One Call API */}
                {weatherData.hasOwnProperty("timezone") ? <HourlyForecast /> : null}
            </Row>

            <Row className="my-4">
                {/* For current and forecast weather data / One Call API */}
                {weatherData.hasOwnProperty("timezone") ? <FiveDayForecast /> : null}
            </Row>

            {/* <Row>
                <span>
                    {JSON.stringify(weatherData)}
                </span>
            </Row> */}
        </Container>
    );
};

export default Weather;
