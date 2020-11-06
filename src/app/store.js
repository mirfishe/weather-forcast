import {configureStore} from "@reduxjs/toolkit";
import locationReducer from "./locationSlice";
import weatherReducer from "./weatherSlice";

export default configureStore({
  reducer: {
    location: locationReducer,
    weather: weatherReducer
  },
});
