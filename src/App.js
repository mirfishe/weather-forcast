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

  const [checkingLocationMessage, setCheckingLocationMessage] = useState("Checking for your location.");
  const [locationDataFound, setLocationDataFound] = useState(false);
  const [locationDataMessage, setLocationDataMessage] = useState("");
  const [errLocationData, setErrLocationData] = useState("");
  const [geolocationAvailable, setGeolocationAvailable] = useState(false);
  const [showZipCodeForm, setShowZipCodeForm] = useState(false);

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

    dispatch(setLatitude(position.coords.latitude));
    dispatch(setLongitude(position.coords.longitude));
    setCheckingLocationMessage("");
    determineShowZipCodeForm();
  };

  const determineShowZipCodeForm = () => {
    // console.log(componentName, "showZipCodeForm");
    if (zipCode !== "" && zipCode !== undefined) {
      // console.log(componentName, "showZipCodeForm zipCode", zipCode);
      setShowZipCodeForm(false);
    } else if (latitude !== "" && latitude !== undefined && longitude !== "" && longitude !== undefined) {
      // console.log(componentName, "useEffect Latitude: ", latitude, "Longitude: ", longitude);
      setShowZipCodeForm(false);
    } else if (checkingLocationMessage === "" && !locationDataFound) {
      // console.log(componentName, "showZipCodeForm checkingLocationMessage === \"\"");
      // console.log(componentName, "showZipCodeForm !locationDataFound", locationDataFound);
      setShowZipCodeForm(true);
    } else if (!geolocationAvailable && !locationDataFound) {
      // console.log(componentName, "showZipCodeForm !geolocationAvailable", geolocationAvailable);
      // console.log(componentName, "showZipCodeForm !locationDataFound", locationDataFound);
      setShowZipCodeForm(true);
    // } else if (!locationDataFound) {
    //   console.log(componentName, "showZipCodeForm !locationDataFound", locationDataFound);
    //   setShowZipCodeForm(true);
    } else {
      // console.log(componentName, "showZipCodeForm else");
      setShowZipCodeForm(false);
    };
  };

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  useEffect(() => {
    setTimeout(function(){setCheckingLocationMessage(""); determineShowZipCodeForm();}, 4000);
    // let checkingLocation = setInterval(function(){console.log(componentName, "checkingLocation"); setCheckingLocationMessage(""); determineShowZipCodeForm(); clearInterval(checkingLocation);}, 4000);
  }, []);

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
    if (zipCode !== "" && zipCode !== undefined) {
      // console.log(componentName, "useEffect zipCode: ", zipCode);
      setLocationDataMessage("Zip Code: " + zipCode);
      setGeolocationAvailable(true);
      setLocationDataFound(true);
      determineShowZipCodeForm();
    } else if (latitude !== "" && latitude !== undefined && longitude !== "" && longitude !== undefined) {
      // console.log(componentName, "useEffect Latitude: ", latitude, "Longitude: ", longitude);
      setLocationDataMessage("Latitude: " + latitude + " Longitude: " + longitude);
      setGeolocationAvailable(true);
      setLocationDataFound(true);
      determineShowZipCodeForm();
    } else {
      setGeolocationAvailable(false);
      setLocationDataFound(false);
    };
  }, [zipCode, latitude, longitude, determineShowZipCodeForm]);

  const locationComponents = () => {
    return (
      <React.Fragment>
        {/* {locationDataMessage !== "" ? <Alert color="info" className="m-2">{locationDataMessage}</Alert> : null} */}
        <Weather />
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <Jumbotron fluid className="header">
        <Container>
          <h1 className="display-4 text-center">Local Weather Forecast</h1>
        </Container>
      </Jumbotron>

      <Container fluid>
      <Row className="justify-content-center">
        <Col sm="6">
            {checkingLocationMessage !== "" ? <Alert color="info" className="m-2">{checkingLocationMessage}</Alert> : null}
            {errLocationData !== "" ? <Alert color="danger" className="m-2">{errLocationData}</Alert> : null}
          </Col>
        </Row>
        <Row>
          <Col>
            {showZipCodeForm ? <ZipCode /> : null}
            {locationDataFound ? locationComponents() : null}
          </Col>
        </Row>
      </Container>
      </React.Fragment>
  );
}

export default App;
