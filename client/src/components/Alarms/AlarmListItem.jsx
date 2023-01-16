import { useContext, useCallback } from "react";
import axios from "axios";
import { alarmContext } from "../../context/AlarmProvider";
import {
  Card,
  Button,
  Container,
  Row,
  Col,
  Accordion,
  Dropdown,
  Modal,
  Badge
} from "react-bootstrap";
// import "../../styles/ButtonsWrappers.css"
import "../../styles/AlarmOption.css";
import "../../styles/Cards.css"
import AlarmForm from "./AlarmForm";
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
  const { alarmItems, setAlarmItems, alarmFlip, setAlarmFlip, editOptions, setEditOptions, initialEditValues, setEditValues } =
    useContext(alarmContext);

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


  const findAlarm = (id) => {
    const filtered = alarmItems.filter((alarmItem) =>{
      return alarmItem.id === id
    })
      setEditValues(filtered)
  };

  const flipCard = (id, save, initial) => {
    return (e) => {
      setEditValues([initialEditValues])
      e.preventDefault();
      let flipped = new Set(alarmFlip);
      if (flipped.has(id)) {
        flipped.delete(id);
      } else {
        flipped.add(id);
      }
      setAlarmFlip(flipped);
      if(save === true){
        setEditOptions(true)
      }
      if(initial === true){
        findAlarm(id)
        // console.log("id", id)
      }
    };
  };




  return (
    <ReactCardFlip isFlipped={alarmFlip.has(id)} flipDirection="horizontal">
      <Container fluid>
        <Card className="mt-2 shadow-lg card-background">
          <Card.Body className="card-background">
            <Row className="card-row card-background">
              <Col className="display-10 card-background alarm-name">
                {alarm_name ? alarm_name : "(no label)"}
              </Col>
              <Col className="card-background">
                {active && <Badge bg="secondary">active</Badge>}
                {!active && <Badge bg="secondary">inactive</Badge>}
                <br/>
                <input type="checkbox" onChange={() => onToggle(id)} checked={!active && true} />
                <br/>
              </Col>
            </Row>
            <Row className="card-row card-background">
              <Col className="card-background">
                <Card.Title className="display-10 card-background">{`${hour}:${minutes} ${am_pm}`}</Card.Title>
              </Col>

              <Col className="card-background">
                <Button variant="outline-secondary" onClick={flipCard(id, false, true)}>
                  Edit
                </Button>
              </Col>
            </Row>

            <Row className="card-row card-background">
              <Col className="card-background">
                <Dropdown drop="end" className="card-background">
                  <Dropdown.Toggle
                    className="wrapper-option select"
                    
                    variant="outline-secondary"
                    id="dropdown-basic"
                  >
                    Details
                  </Dropdown.Toggle>

                  <Dropdown.Menu align="end">
                    <Dropdown.Item>Contacts: {contact_name}</Dropdown.Item>
                    <Dropdown.Item>Sound: {sound_name}</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col className="card-background">
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
        <AlarmForm 
        flipCard={flipCard} 
        id={props.id} 
        hour={hour}
        minutes={minutes}
        am_pm={am_pm}
        contact_name={contact_name}
        sound_name={sound_name}
        active={active}
        alarm_name={alarm_name}
         status={"edit"}
         currentAlarmItem={currentAlarmItem} />
        <Button variant="outline-secondary" onClick={flipCard(id, true)}>
          Save Edit
        </Button>
        <Button variant="outline-secondary" onClick={flipCard(id)}>
          Cancel
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
