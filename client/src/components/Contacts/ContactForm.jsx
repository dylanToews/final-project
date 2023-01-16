import axios from "axios";
import { useContext, useState } from "react";
import { alarmContext } from "../../context/AlarmProvider";
import { authContext } from "../../context/AuthProvider";
import "../../styles/Contacts.css"
import "../../styles/Cards.css"

function ContactForm() {
  const { contactItems, setContactItems } = useContext(alarmContext);
  const { user } = useContext(authContext);

  const initialValues = {
    contact_name: "",
    contact_number: "",
    confirm_number: ""
  };

  const [formData, setFormData] = useState(initialValues);

  const handleNumberChange = (event) => {
    const x = event.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    event.target.value = !x[2] ? x[1] : x[1] + '-' + x[2] + (x[3] ? '-' + x[3] : '');
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const checkNumber = (number1, number2) =>{
    if(number1 === number2)
    return true;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const newContactItem = {
      user_email: user.email,
      user_id: user.id, 
      contact_name: formData.contact_name, 
      contact_number: formData.contact_number
    }

    if (formData.contact_name && checkNumber(formData.contact_number, formData.confirm_number)) {
      axios.post("/api/v1/contactItems", {newContactItem}).then((res) => {
        newContactItem.id = res.data.id;
        setContactItems([...contactItems, newContactItem]);
        setFormData(initialValues);
      })
    }
    //could add error state here -- populate error state if all forms are not selected
  };

  return (
    <div className="ContactForm">
      <div className="container">
        <h1>Add a New Contact</h1>
        <form className="Form-at card card-background" onSubmit={handleSubmit}>
          <label className="card-background">Name</label>
          <input
            name="contact_name"
            type="text"
            value={formData.contact_name}
            onChange={handleChange}
            placeholder="Enter contact name..."
            className="inputBox card-background"
          />
          <br className="card-background"/>
          <label className="card-background">Phone number</label>
          <input
            name="contact_number"
            type="tel"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            value={formData.contact_number}
            onChange={handleNumberChange}
            placeholder="Enter contact phone..."
            className="inputBox"
          />
          <br />
          <label className="card-background">Confirm phone number</label>
          <input
            name="confirm_number"
            type="tel"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            value={formData.confirm_number}
            onChange={handleNumberChange}
            placeholder="Confirm contact phone..."
            className="inputBox"
          />
          <br />
          <span className="note card-background">
            {formData.contact_number && formData.confirm_number && (formData.contact_number === formData.confirm_number) && "Match! ✅"}
            {formData.contact_number !== formData.confirm_number && "Numbers don't match... ❌"}
          </span>
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
