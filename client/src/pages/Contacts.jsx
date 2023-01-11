import React from "react";
import "../App.css";

function Contacts() {
  return (
    <div class="App">
      <div class="container">
        <h1>Contacts</h1>
        <form className="Form-at">
          <label>Name</label>
          <input
            name="name"
            type="name"
            placeholder="Enter contact name..."
            className="inputBox"
          />
          <br />
          <label>Phone number</label>
          <input
            name="phone"
            type="phone"
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
          <button type="submit" class="submit">
            Add Contact
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contacts;
