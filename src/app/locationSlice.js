import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    zipCode: "",
    latitude: "",
    longitude: "",
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setZipCode: {
      reducer(state, action) {
        // console.log("appSlice.js setZipCode action.payload", action.payload);
        // console.log("appSlice.js setZipCode action.payload.length", action.payload.length);

        state.zipCode = action.payload;

      }
    },
    setLatitude: {
      reducer(state, action) {
        // console.log("appSlice.js setLatitude action.payload", action.payload);
        // console.log("appSlice.js setLatitude action.payload.length", action.payload.length);

        state.latitude = action.payload;

      }
    },
    setLongitude: {
      reducer(state, action) {
        // console.log("appSlice.js setLongitude action.payload", action.payload);
        // console.log("appSlice.js setLongitude action.payload.length", action.payload.length);

        state.longitude = action.payload;

      }
    }
}
});

export const {setZipCode, setLatitude, setLongitude} = locationSlice.actions

export default locationSlice.reducer