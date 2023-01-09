import { useState } from "react";

export default function SetParamsForm(props) {
  const { onSubmit, users, sounds, contacts, alarms } = props;

  const parsedUsers = users.map((user) => (
    <option key={user} value = {user}>{user}</option>
  )) 

  const parsedContacts = contacts.map((contact) => (
    <option key={contact} value = {contact}>{contact}</option>
  )) 

  const parsedSounds = sounds.map((sound) => (
    <option key={sound} value = {sound}>{sound}</option>
  )) 

  const parsedAlarms = alarms.map((alarm) => (
    <option key={alarm} value = {alarm}>{alarm}</option>
  )) 

  const initialValues = {
    user: "",
    contact: "",
    sound: "",
    time: "",
  };

  const [formData, setFormData] = useState(initialValues);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if(formData.user && formData.contact && formData.sound) {
      onSubmit(formData);
      setFormData(initialValues);
    }
    //could add error state here -- populate error state if all forms are not selected

  };

  return (
    <form className="SetParamsForm" onSubmit={handleSubmit}>
      {/* <h2>Select User</h2>
      <select name="user" value={formData.user} onChange={handleChange}>
        <option value="">Please Select A User</option>
        {parsedUsers}
      </select> */}
{/* 
      <h2>Select Alarm</h2>
      <select name="time" value={formData.time} onChange={handleChange}>
        <option value="">Please Select an Alarm</option>
        {parsedAlarms}
      </select> */}

      <h2>Select Contact </h2>
      <select name="contact" value={formData.contact} onChange={handleChange}>
        <option value="">Please Select A Contact</option>
        {parsedContacts}
      </select>

      <h2>Select Sound </h2>
      <select name="sound" value={formData.sound} onChange={handleChange}>
        <option value="">Please Select A Sound</option>
        {parsedSounds}
      </select>
      {/* <br></br>
      <button>Add Options </button> */}
    </form>
  );
}
