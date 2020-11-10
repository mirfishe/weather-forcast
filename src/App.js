import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import './App.css';
import {Container, Col, Row, Jumbotron, Alert} from "reactstrap";
import {setLatitude, setLongitude} from "./app/locationSlice";
import Weather from "./components/weather/Weather";
import ZipCode from "./components/zipCode/ZipCode";

function App() {

  const componentName = "App.js";

  const dispatch = useDispatch();

  const zipCode = useSelector(state => state.location.zipCode);
  const latitude = useSelector(state => state.location.latitude);
  const longitude = useSelector(state => state.location.longitude);

  const [locationDataFound, setLocationDataFound] = useState(false);
  const [locationDataMessage, setLocationDataMessage] = useState("");
  const [errLocationData, setErrLocationData] = useState("");
  const [geolocationAvailable, setGeolocationAvailable] = useState(true);

  const getLocation = () => {
    if (navigator.geolocation) {
      // console.log(componentName, "getLocation navigator.geolocation", navigator.geolocation);
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      // console.log(componentName, "getLocation Geolocation is not supported by this browser.");
      setErrLocationData("Geolocation is not supported by this browser.");
    };
  };

  const showPosition = (position) => {
    // console.log(componentName, "showPosition position: ", position);
    // console.log(componentName, "showPosition Latitude: ", position.coords.latitude, "Longitude: ", position.coords.longitude);
    // setLatitude(position.coords.latitude);
    // setLongitude(position.coords.longitude);

    dispatch(setLatitude(position.coords.latitude));
    dispatch(setLongitude(position.coords.longitude));
  };

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  useEffect(() => {
    if (!geolocationAvailable) {
      // console.log(componentName, "useEffect geolocationAvailable", geolocationAvailable);
      // console.log(componentName, "useEffect Location is not available.");
      // setErrLocationData("Location is not available.");
    } else {
      setErrLocationData("");
    };
  }, [geolocationAvailable]);

  useEffect(() => {
    if (zipCode !== "") {
      // console.log(componentName, "useEffect zipCode: ", zipCode);
      setLocationDataMessage("Zip Code: " + zipCode);
      setGeolocationAvailable(true);
      setLocationDataFound(true);
    } else if (latitude !== "" && longitude !== "") {
      // console.log(componentName, "useEffect Latitude: ", latitude, "Longitude: ", longitude);
      setLocationDataMessage("Latitude: " + latitude + " Longitude: " + longitude);
      setGeolocationAvailable(true);
      setLocationDataFound(true);
    } else {
      setGeolocationAvailable(false);
    };
  }, [zipCode, latitude, longitude]);

    const locationComponents = () => {
      return (
        <Container>
          <Row className="justify-content-center">
            <Col>
              {/* {locationDataMessage !== "" ? <Alert color="info">{locationDataMessage}</Alert> : null} */}
              <Weather />
            </Col>
          </Row>
        </Container>
      );
    };

  return (
    <React.Fragment>
      <Jumbotron fluid className="header">
        <Container>
          <h1 className="display-4 text-center">Local Weather Forecast</h1>
        </Container>
      </Jumbotron>

      <Container>
        <Row>
          {/* <Col>
          <Jumbotron fluid>
            <Container>
              <h1 className="display-4">Local Weather Forecast</h1>
            </Container>
          </Jumbotron>
          </Col> */}
          <Col>
            {errLocationData !== "" ? <Alert color="danger">{errLocationData}</Alert> : null}
            {locationDataFound ? locationComponents() : <ZipCode />}
          </Col>
        </Row>
      </Container>
      </React.Fragment>
  );
}

export default App;
