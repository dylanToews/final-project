import { Card, Button, Container, Row, Col, Accordion } from "react-bootstrap";
function About() {


    return (
        <div className="About">
            <br/><br/>
            <h1 className="title-text">Welcome to Startle!</h1>
            <h2>Helping manage time through communication and technology</h2>
            <br/><br/>
            <img src={require('../startle.png')}/>
            <br/>
    
            <br/>
            <br/>
            <div>
            <h4>Startle is an application that lets YOU wake yourself up.</h4>
            <br/>
            <p className="about-text">Using sound recording technology, Startle allows you to record any custom audio you want for your alarms. And in the event of snoozing through an alarm, Startle sends a message via SMS to a contact of your choosing.</p>
            {/* <p>And if it fails to do that, it passes the responsibility onto your selected contact</p>
            <p>by sending them SMS messages when you snooze your alarms.</p> */}
            </div>
        </div>
    );
}

export default About;