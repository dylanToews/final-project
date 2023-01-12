import React from "react";
import { useContext, useState } from "react";
import useSelect from "../../hooks/useSelect";
import { AlarmContext } from "../context/AlarmProvider";

function ContactForm() {

const { contactItems } =useContext(AlarmContext)

const initialValues = {
  contact_name: "",
  contact_number:"",
};

const [formData, setFormData] = useState(initialValues);

const handleChange = (event) => {
  const { name, value } = event.target;
  setFormData({ ...formData, [name]: value });
};


  return (
    <div className="App">
      <div className="container">
        <h1>Contacts</h1>
        <form className="Form-at">
          <label>Name</label>
          <input
            name="name"
            type="name"
            value={formData.contact_name}
            onChange={handleChange}
            placeholder="Enter contact name..."
            className="inputBox"
          />
          <br />
          <label>Phone number</label>
          <input
            name="phone"
            type="phone"
            value={formData.contact_number}
            onChange={handleChange}
            placeholder="Enter contact phone..."
            className="inputBox"
          />
          <br />
          <label>Confirm phone number</label>
          <input
            name="phone"
            type="phone"
            placeholder="Confirm contact phone..."
            className="inputBox"
          />
          <br />
          <button type="submit" className="submit">
            Add Contact
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;
