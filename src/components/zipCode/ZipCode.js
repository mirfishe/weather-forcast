import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {Container, Col, Row, Alert, Button, Form, FormGroup, Label, Input} from "reactstrap";
import {setZipCode} from "../../app/locationSlice";

const ZipCode = (props) => {

    const dispatch = useDispatch();

    const [txtZipCode, setTxtZipCode] = useState("");
    const [errZipCodeMessage, setErrWZipCodeMessage] = useState("");

    // Google Maps api
    // Get longitude and latitude from zip codes
    // https://developers.google.com/maps/documentation/geocoding/overview?csw=1
    // key=API_KEY

    const submitZipCode = () => {
        // console.log("ZipCode.js setZipCode");

        if (txtZipCode !== "" && !isNaN(txtZipCode)) {

            dispatch(setZipCode(txtZipCode));

        } else {
            setErrWZipCodeMessage("Please enter a valid zip code.")
        };

    };

    return(
        <Container>
            <Row>
            {errZipCodeMessage !== "" ? <Alert color="danger">{errZipCodeMessage}</Alert> : null}
            </Row>
            <Row className="justify-content-center">
                <Col sm="8">
                    <Form>
                        <FormGroup>
                            <Label for="txtZipCode">Zip Code</Label>
                            <Input type="text" id="txtZipCode" size="lg" value={txtZipCode} onChange={(event) => {/*console.log(event.target.value);*/ setTxtZipCode(event.target.value);}} />
                        </FormGroup>
                        <Button outline size="lg" color="primary" onClick={submitZipCode}>Submit</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default ZipCode;
