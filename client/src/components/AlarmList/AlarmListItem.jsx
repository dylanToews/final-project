import { useContext, useCallback } from "react";
import axios from "axios";
import { AlarmContext } from "../context/AlarmProvider";
import {
  Card,
  Button,
  Container,
  Row,
  Col,
  Accordion,
  Dropdown,
  Modal,
} from "react-bootstrap";
import {ToggleSlider} from "react-toggle-slider";
// import "../../styles/ButtonsWrappers.css"
import "../../styles/AlarmOption.css";
import AlarmOption from "../AlarmOption/AlarmOption";
import ReactCardFlip from "react-card-flip";

export default function AlarmListItem(props) {
  const {
    id,
    hour,
    minutes,
    am_pm,
    contact_name,
    sound_name,
    active,
    alarm_name,
  } = props;
  const { alarmItems, setAlarmItems, alarmFlip, setAlarmFlip } =
    useContext(AlarmContext);

  const removeAlarm = (id) => {
    const filtered = (current) =>
      current.filter((alarm) => {
        return alarm.id !== id;
      });
    setAlarmItems(filtered);
    axios.delete(`api/v1/alarmItems/${id}`).then((res) => {});
  };

  // find current alarmItem
  const currentAlarmItem = alarmItems.find((alarm) => alarm.id === id);
  const alarmItemIndex = alarmItems.map((alarm) => alarm.id).indexOf(id);
  const nextToggle = currentAlarmItem.active ? false : true;

  const onToggle = (id) => {
    const updatedAlarmItems = [...alarmItems];
    updatedAlarmItems[alarmItemIndex].active = nextToggle;
    axios.put(`/api/v1/alarmItems/${id}`).then((res) => {
      setAlarmItems(updatedAlarmItems);
    });
  };

  const flipCard = (id) => {
    return (e) => {
      e.preventDefault();
      let flipped = new Set(alarmFlip);
      if (flipped.has(id)) {
        flipped.delete(id);
      } else {
        flipped.add(id);
      }
      setAlarmFlip(flipped);
    };
  };

  const editAlarm = (id) => {
    console.log("edit alarm");
    setAlarmFlip(!alarmFlip);
  };



  return (
    <ReactCardFlip isFlipped={alarmFlip.has(id)} flipDirection="horizontal">
      <Container fluid>
        <Card className="mt-2 shadow-lg ">
          <Card.Body>
            <Row>
              <Col className="display-10">
                {alarm_name ? alarm_name : "(no label)"}
              </Col>
              <Col>
                <ToggleSlider className="toggle-switch" /> 
                {/* Slider currently does nothing, just sits there looking round */}
                <Button
                  variant="outline-secondary"
                  onClick={() => onToggle(id)}
                >
                  {active && "Active"}
                  {!active && "Inactive"}
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Card.Title className="display-10">{`${hour}:${minutes} ${am_pm}`}</Card.Title>
              </Col>

              <Col>
                <Button variant="outline-secondary" onClick={flipCard(id)}>
                  Edit
                </Button>
              </Col>
            </Row>

            <Row>
              <Col>
                <Dropdown>
                  <Dropdown.Toggle
                    className="wrapper-option select"
                    id="dropdown-basic"
                  >
                    Details
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item>Contacts: {contact_name}</Dropdown.Item>
                    <Dropdown.Item>Sound: {sound_name}</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col>
                <Button
                  variant="outline-secondary"
                  onClick={() => removeAlarm(id)}
                >
                  Delete
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
      <Card>
        <AlarmOption flipCard={flipCard} id={id} />
        <Button variant="outline-secondary" onClick={flipCard(id)}>
          Save Edit
        </Button>
      </Card>
    </ReactCardFlip>
  );
}

{
  /* <Accordion>
<Accordion.Item eventKey="0">
  <Accordion.Header>Alarm Details</Accordion.Header>
  <Accordion.Body>
    <Card.Text>Contacts: {contact_name}</Card.Text>
    <Card.Text>Sound: {sound_name}</Card.Text>
  </Accordion.Body>
</Accordion.Item>
</Accordion> */
}

{
  /* <ul className="AlarmListItem">
<div className="TimeCardFormat">
  <p className="TimeDisplay">{`${hour}:${minutes}`}</p>
  <p className="AMPM">{`${am_pm}`}</p>
</div>
<div>
  <button onClick={() => onToggle(id)} className="alarm-toggle">{active && "ON"}{!active && "OFF"}</button>
</div>
<div>
  <p className="ContactDisplay">Contacts: {contact_name}</p>
  <p className="SoundDisplay">Sound: {sound_name}</p>
  <button onClick={() => removeAlarm(id)} className="deleteButton">Delete</button>
</div>
<br/>
</ul> */
}
