// Most likely unneccessary 

import { useState } from "react";

export default function SetAlarmForm(props) {
  const { onSubmit } = props;

  const initialValues = {
    time: "",
  };

  const [formData, setFormData] = useState(initialValues);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    
    onSubmit(formData)

    setFormData(initialValues)
  };

  return (
    <form className="SetAlarmForm" onSubmit={handleSubmit}>
      <h2>Choose Time</h2>
      <input 
      type="text" 
      name="time" 
      placeholder="Enter time" 
      onChange={handleChange} 
      value={formData.time}/>
      <button>Add Time</button>
    </form>
  );
}
