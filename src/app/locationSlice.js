import {createSlice} from "@reduxjs/toolkit";

const componentName = "locationSlice.js";

const initialState = {
    zipCode: "",
    latitude: "",
    longitude: "",
    zipCodeData: {}
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setZipCode: {
      reducer(state, action) {
        // console.log(componentName, "setZipCode action.payload", action.payload);
        // console.log(componentName, "setZipCode action.payload.length", action.payload.length);

        state.zipCode = action.payload;

      }
    },
    setLatitude: {
      reducer(state, action) {
        // console.log(componentName, "setLatitude action.payload", action.payload);
        // console.log(componentName, "setLatitude action.payload.length", action.payload.length);

        state.latitude = action.payload;

      }
    },
    setLongitude: {
      reducer(state, action) {
        // console.log(componentName, "setLongitude action.payload", action.payload);
        // console.log(componentName, "setLongitude action.payload.length", action.payload.length);

        state.longitude = action.payload;

      }
    },
    setZipCodeData: {
      reducer(state, action) {
        // console.log(componentName, "setZipCodeData action.payload", action.payload);
        // console.log(componentName, "setZipCodeData action.payload.length", action.payload.length);

        state.zipCodeData = action.payload;

      }
    }
}
});

export const {setZipCode, setLatitude, setLongitude, setZipCodeData} = locationSlice.actions;

export default locationSlice.reducer;