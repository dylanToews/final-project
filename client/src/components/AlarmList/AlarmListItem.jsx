import { useContext } from "react";
import axios from "axios";
import { AlarmContext } from "../context/AlarmProvider";
import { Card, Button, Container, Row, Col, Accordion } from "react-bootstrap";
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
<<<<<<< HEAD
    });
  };

=======
    })
  }
  
>>>>>>> main
  return (
    <Container fluid>
      <Card className="mt-2 shadow-lg">
        <Card.Body>
          <Card.Title className="display-2">{`${hour}:${minutes} ${am_pm}`}</Card.Title>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Alarm Details</Accordion.Header>
              <Accordion.Body>
                <Card.Text>Contacts: {contact_name}</Card.Text>
                <Card.Text>Sound: {sound_name}</Card.Text>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
      <div className="d-flex justify-content-around">
          <Button
            variant="outline-secondary"
            onClick={() => onToggle(id)}
            className="d-flex justify-content-around"
          >
            {active && "ON"}
            {!active && "OFF"}
          </Button>
          <Button
            variant="outline-secondary"
            onClick={() => removeAlarm(id)}
            className="d-flex justify-content-around"
          >
            Delete
          </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
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
