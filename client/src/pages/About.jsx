
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
            <h3>Helping you manage time through communication and technology</h3>
            <br/>
            <br/>
            <p>Startle is an application that lets YOU wake yourself up.</p>
            <br/>
            <p>Using sound recording technology, Startle allows you to record any custom audio you want for your alarms. And in the situation of snoozing through an alarm, Startle sends a message to a contact of your choosing.</p>
            {/* <p>And if it fails to do that, it passes the responsibility onto your selected contact</p>
            <p>by sending them SMS messages when you snooze your alarms.</p> */}

        </div>
    );
}

export default About;