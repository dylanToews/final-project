import { useState } from "react";

export default function CategoryForm(props){
  const { onSubmit } = props;

  const initialValues = {
    category:""
  }
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (ev) => {
    const {name, value} = ev.target;

    setFormData({...formData, [name]:value})
  }

  const handleSubmit = ev => {
      ev.preventDefault();
    onSubmit(formData);

    setFormData(initialValues);
  };

  return (
    <form className="CategoryForm" onSubmit={handleSubmit}>
      <h2>Add a Sound Category</h2>
        <input 
          type="text" 
          name="category" 
          placeholder="Enter a new category!" 
          onChange={handleChange} 
          value={formData.category}
        />
      <button>Add Category</button>
    </form>
  )
}