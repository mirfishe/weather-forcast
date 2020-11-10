import {createSlice} from "@reduxjs/toolkit";

const componentName = "weatherSlice.js";

const initialState = {
    weatherData: {},
    // currentWeather: {},
    // hourlyForecast: {},
    // dailyForecast: {}
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setWeatherData: {
        reducer(state, action) {
          // console.log(componentName, "setWeatherData action.payload", action.payload);
          // console.log(componentName, "setWeatherData action.payload.length", action.payload.length);
  
          state.weatherData = action.payload;
  
        }
      },
    // setCurrentWeather: {
    //   reducer(state, action) {
    //     // console.log(componentName, "setCurrentWeather action.payload", action.payload);
    //     // console.log(componentName, "setCurrentWeather action.payload.length", action.payload.length);

    //     state.currentWeather = action.payload;

    //   }
    // },
    // setHourlyForecast: {
    //   reducer(state, action) {
    //     // console.log(componentName, "setHourlyForecast action.payload", action.payload);
    //     // console.log(componentName, "setHourlyForecast action.payload.length", action.payload.length);

    //     state.hourlyForecast = action.payload;

    //   }
    // },
    // setDailyForecast: {
    //   reducer(state, action) {
    //     // console.log(componentName, "setDailyForecast action.payload", action.payload);
    //     // console.log(componentName, "setDailyForecast action.payload.length", action.payload.length);

    //     state.dailyForecast = action.payload;

    //   }
    // }
}
});

export const {setWeatherData/*, setCurrentWeather, setHourlyForecast, setDailyForecast*/} = weatherSlice.actions

export default weatherSlice.reducer;