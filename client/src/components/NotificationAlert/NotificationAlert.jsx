import React, { useContext, useState } from "react";
import axios from "axios";
import { AlarmContext } from "../context/AlarmProvider";
import { authContext } from "../../providers/AuthProvider";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function NotificationAlert(props) {
  const { setNotification, notificationDetails } = useContext(AlarmContext);
  const { user } = useContext(authContext);

  const twilioData = {
    contact_name: notificationDetails.contact_name,
    contact_number: notificationDetails.contact_number,
    user_name: user.name,
  };

  function snoozeAlarm() {
    console.log(`text sent to:${notificationDetails.contact_number}`)
    setTimeout(() => {
      setNotification(true)
    }, 30000);
    setNotification(false);
    axios.post("/api/v1/sendSMS", { twilioData }).then((res) => {
      console.log(`text sent to ${twilioData}`);
    });
    return;
  }

  function acceptNotification() {
    setNotification(false);
    console.log("accept button pressed");
    return;
  }

  return (
    <div
    className="modal show"
    style={{ display: 'block', position: 'initial' }}
  >
    <Modal
    show="true"
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered>
    <Modal.Dialog>
      <Modal.Header closeButton>
        <Modal.Title>Your Alarm Has Gone Off!!</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Hello {notificationDetails.contact_name} Your {notificationDetails.alarm_time} alarm has gone off</p>
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