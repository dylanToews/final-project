import React, { useContext, useState } from "react";
import axios from "axios";
import { AlarmContext } from "../context/AlarmProvider";
import { authContext } from "../../providers/AuthProvider";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AlarmOption from "../AlarmOption/AlarmOption";

export default function NotificationAlert(props) {
  const { setNotification, notificationDetails } = useContext(AlarmContext);
  const { user } = useContext(authContext);

  const twilioData = {
    contact_name: notificationDetails.contact_name,
    contact_number: notificationDetails.contact_number,
    user_name: user.name,
    alarm_name: notificationDetails.alarm_name
  };

  function snoozeAlarm() {

    setTimeout(() => {
      setNotification(true)
    }, 300000);
    setNotification(false);
    axios.post("/api/v1/sendSMS", { twilioData }).then((res) => {
 
    });
    return;
  }

  function acceptNotification() {
    setNotification(false);

    return;
  }

  return (
    <div
    className="modal show transparent"
    style={{ display: 'block', position: 'initial' }}
  >
    <Modal
    show="true"
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    className="transparent"
    centered>
    <Modal.Dialog className="transparent">
      <Modal.Header className="transparent" id="modal-header">
      <img id="modal-header"src={require('../../startle.png')} width="20%"/>
        <Modal.Title className="transparent">Your Alarm Has Gone Off!!</Modal.Title>
      </Modal.Header>

      <Modal.Body className="transparent">
        <p id="modal-text">Hey {user.name}! Your "{notificationDetails.alarm_name}" alarm has gone off!</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={acceptNotification}>Accept Alarm</Button>
        <Button variant="primary" onClick={snoozeAlarm}>Snooze Alarm</Button>
      </Modal.Footer>
    </Modal.Dialog>
    </Modal>
  </div>

    
  );
}