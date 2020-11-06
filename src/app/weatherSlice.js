import {createSlice} from "@reduxjs/toolkit";

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
          // console.log("appSlice.js setWeatherData action.payload", action.payload);
          // console.log("appSlice.js setWeatherData action.payload.length", action.payload.length);
  
          state.weatherData = action.payload;
  
        }
      },
    // setCurrentWeather: {
    //   reducer(state, action) {
    //     // console.log("appSlice.js setCurrentWeather action.payload", action.payload);
    //     // console.log("appSlice.js setCurrentWeather action.payload.length", action.payload.length);

    //     state.currentWeather = action.payload;

    //   }
    // },
    // setHourlyForecast: {
    //   reducer(state, action) {
    //     // console.log("appSlice.js setHourlyForecast action.payload", action.payload);
    //     // console.log("appSlice.js setHourlyForecast action.payload.length", action.payload.length);

    //     state.hourlyForecast = action.payload;

    //   }
    // },
    // setDailyForecast: {
    //   reducer(state, action) {
    //     // console.log("appSlice.js setDailyForecast action.payload", action.payload);
    //     // console.log("appSlice.js setDailyForecast action.payload.length", action.payload.length);

    //     state.dailyForecast = action.payload;

    //   }
    // }
}
});

export const {setWeatherData/*, setCurrentWeather, setHourlyForecast, setDailyForecast*/} = weatherSlice.actions

export default weatherSlice.reducer;