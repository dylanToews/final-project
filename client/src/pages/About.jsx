
import { Card, Button, Container, Row, Col, Accordion } from "react-bootstrap";
function About() {



    return (
        <div className="App">
            <br/>
            <h1>About Startle</h1>
            <br/><br/>
            <img src={require('../startle.png')}/>
            <br/><br/><br/><br/>
            <h2>Welcome to Startle!</h2>
            <br/>
            <h3>Startle is an application that lets YOU wake yourself up.</h3>
            <br/>
            <p>And if it fails to do that, it passes the responsibility onto your loved ones</p>
            <p>by sending them SMS messages when you snooze your alarms.</p>

        </div>
    );
}

export default About;