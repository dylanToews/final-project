import { useContext } from "react";
import axios from "axios";
import { AlarmContext } from "../context/AlarmProvider";
import { Card, Button, Container, Row, Col, Accordion, Dropdown } from "react-bootstrap";
export default function AlarmListItem(props) {
  const { id, user, hour, minutes, am_pm, contact_name, sound_name, active } =
    props;
  const { alarmItems, setAlarmItems } = useContext(AlarmContext);

  const removeAlarm = (id) => {
    const filtered = (current) =>
      current.filter((alarm) => {
        return alarm.id !== id;
      });
    setAlarmItems(filtered);
    console.log(id);
    axios.delete(`api/v1/alarmItems/${id}`).then((res) => {
      console.log("deleted alarm with id:", id);
    });
  };

  // find current alarmItem
  const currentAlarmItem = alarmItems.find((alarm) => alarm.id === id);
  const alarmItemIndex = alarmItems.map((alarm) => alarm.id).indexOf(id);
  const nextToggle = currentAlarmItem.active ? false : true;

  const onToggle = (id) => {
    const updatedAlarmItem = {
      ...currentAlarmItem,
      active: nextToggle,
    };
    const updatedAlarmItems = [...alarmItems];
    updatedAlarmItems[alarmItemIndex].active = nextToggle;
    axios.put(`/api/v1/alarmItems/${id}`).then((res) => {
      setAlarmItems(updatedAlarmItems);
    });
  };

  return (
    <Container fluid>
      <Card className="mt-2 shadow-lg">
        <Card.Body>
          <Row>
            <Col>
              <Card.Title className="display-10">{`${hour}:${minutes} ${am_pm}`}</Card.Title>
            </Col>

            <Col>
              <Button variant="outline-secondary" onClick={() => onToggle(id)}>
                {active && "ON"}
                {!active && "OFF"}
              </Button>
            </Col>
          </Row>

          <Row>
            <Col>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Details
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item>Contacts: {contact_name}</Dropdown.Item>
                  <Dropdown.Item>
                  Sound: {sound_name}
                  </Dropdown.Item>
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
