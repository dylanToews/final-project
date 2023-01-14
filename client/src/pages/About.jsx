import React from 'react';

import { Card, Button, Container, Row, Col, Accordion } from "react-bootstrap";
function About() {



    return (
<Container fluid>
  <Row>
    <Col >Time</Col>
    <Col >Active?</Col>
  </Row>
  <Row>
    <Col>Details</Col>
    <Col>Delete</Col>
  </Row>
</Container>
    );
}

export default About;