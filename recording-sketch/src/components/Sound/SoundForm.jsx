import { useState } from "react";

export default function SoundForm(props){
  const { onSubmit, categories } = props;

  const parsedCategories = categories.map(category => (
    <option key={category} value={category}>
      {category}
    </option>
  ));

  const initialValues = {
    title:"",
    category:""
  }
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (ev) => {
    const {name, value} = ev.target;

    setFormData({...formData, [name]:value})
  }

  const handleSubmit = ev => {
    ev.preventDefault();

    if (formData.title && formData.category) {
      onSubmit(formData);
      setFormData(initialValues);
    }
    onSubmit(formData);

    setFormData(initialValues);
  };

  return (
    <form className="SoundForm" onSubmit={handleSubmit}>
      <h2>Add a New Sound</h2>
      <input type="text"
        name="title" 
        placeholder="Enter a title!" 
        onChange={handleChange} 
        value={formData.title}
      /><br />
      <select name="category" value={formData.category} onChange={handleChange}>
        <option value="">Please select a category</option>
        {parsedCategories}
      </select><br />
      <button>Add Sound</button>
    </form>
  )
}