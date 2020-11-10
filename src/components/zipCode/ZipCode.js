import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Container, Col, Row, Alert, Button, Form, FormGroup, Label, Input} from "reactstrap";
import {setZipCode, setLatitude, setLongitude, setZipCodeData} from "../../app/locationSlice";
import zipCodeOfflineData from "./zipCodeOfflineData.json";

const ZipCode = (props) => {

    const componentName = "ZipCode.js";

    // const appOffline = true;
    const appOffline = false;

    const dispatch = useDispatch();

    const [txtZipCode, setTxtZipCode] = useState("");
    const [errZipCodeMessage, setErrWZipCodeMessage] = useState("");

    const zipCodeData = useSelector(state => state.location.zipCodeData);

    // Google Maps API
    // Get longitude and latitude from zip codes
    // https://developers.google.com/maps/documentation/geocoding/overview?csw=1
    // key=API_KEY
    // const baseURL = "https://maps.googleapis.com/maps/api/geocode/json";
    // const key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

    // Zip Code API
    // Get longitude and latitude from zip codes
    // http://www.zipcodeapi.com/API
    const baseURL = "http://www.zipcodeapi.com/rest";
    const key = process.env.REACT_APP_ZIP_CODE_API_KEY;

    // https://cors-anywhere.herokuapp.com
    // https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe
    const proxyurl = "https://cors-anywhere.herokuapp.com/";

    const submitZipCode = () => {
        // console.log(componentName, "submitZipCode");

        if (txtZipCode !== "" && !isNaN(txtZipCode)) {

            dispatch(setZipCode(txtZipCode));

            if (!appOffline) {

                // Google Maps API
                // let url = `${baseURL}?address=${txtZipCode}&key=${key}`;
                // let url = `${baseURL}?components=postal_code:${txtZipCode}&key=${key}`;

                // Zip Code API
                let url = `${baseURL}/${key}/info.json/${txtZipCode}/degrees`;

                fetch(proxyurl + url)
                .then(response => {
                    // console.log(componentName, "submitZipCode response", response);
                    if (!response.ok) {
                        throw Error(response.status + " " + response.statusText + " " + response.url);
                    } else {
                        return response.json();
                    };
                })
                .then(data => {
                    console.log(componentName, "submitZipCode data", data);
                    console.log(componentName, "submitZipCode data.lat", data.lat);
                    console.log(componentName, "submitZipCode data.lng", data.lng);

                    dispatch(setZipCodeData(data));
                    dispatch(setLatitude(data.lat));
                    dispatch(setLongitude(data.lng));

                })
                .catch(error => {
                    console.log(componentName, "submitZipCode error", error);
                    // console.log(componentName, "submitZipCode error.name", error.name);
                    // console.log(componentName, "submitZipCode error.message", error.message);
                    setErrWZipCodeMessage(error.name + ": " + error.message);
                });

            } else {
                console.log(componentName, "submitZipCode zipCodeOfflineData", zipCodeOfflineData);
                console.log(componentName, "submitZipCode zipCodeOfflineData.lat", zipCodeOfflineData.lat);
                console.log(componentName, "submitZipCode zipCodeOfflineData.lng", zipCodeOfflineData.lng);
                dispatch(setZipCodeData(zipCodeOfflineData));
                dispatch(setLatitude(zipCodeOfflineData.lat));
                dispatch(setLongitude(zipCodeOfflineData.lng));
            };

        } else {
            setErrWZipCodeMessage("Please enter a valid zip code.")
        };

    };

    return(
        <Container>
            <Row className="justify-content-center mt-4">
                <Col sm="4">
                {errZipCodeMessage !== "" ? <Alert color="danger">{errZipCodeMessage}</Alert> : null}
                    <Form>
                        <FormGroup>
                            <Label for="txtZipCode">Zip Code</Label>
                            <Input type="text" id="txtZipCode" size="lg" value={txtZipCode} onChange={(event) => {/*console.log(event.target.value);*/ setTxtZipCode(event.target.value);}} />
                        </FormGroup>
                        <Button outline size="lg" color="primary" onClick={submitZipCode}>Submit</Button>
                    </Form>
                </Col>
            </Row>
            <Row>
                <span>
                    {zipCodeData.hasOwnProperty("lat") ? JSON.stringify(zipCodeData) : null}
                </span>
            </Row>
        </Container>
    );
};

export default ZipCode;
