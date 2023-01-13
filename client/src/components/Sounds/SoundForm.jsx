import { useState } from "react";
import axios from "axios";


export default function RecordingsList(props) {
  const { recordings, deleteAudio } = props;

  const initialValues = { title: "" };

  const [formData, setFormData] = useState(initialValues);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

  };
  
  // two-part submit: file goes to backend public folder, file references go to db
  const handleSubmit = (event) => {
    event.preventDefault();
    if (recordings.length > 0) {
      const audioFormData = new FormData();
      audioFormData.append("sound", recordings[0].audio);
      // console.log(...audioFormData);
      axios.post("/upload", audioFormData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
        .then(res => res.data) // server sending back filename only
        .then(filename => {
          const newSound = {
            ...formData,
            url: filename
          };
          console.log("new sound: ", newSound);
          axios.post("/api/v2/sounds", {newSound}).then((res) => {
            deleteAudio(recordings[0].key);
            setFormData(initialValues);
          });
        });
    }

  }

  const handleReset = () => {
    deleteAudio(recordings[0].key);
    setFormData(initialValues);
  }

  return (
    <div className="App">
      {recordings.length > 0 ? (
        <>
          <h1>New Recording</h1>
          <form className="SoundForm">
            <input
              type="text"
              name="title"
              placeholder="Enter a title for your new sound"
              onChange={handleChange}
              value={formData.title}
            />
            <button type="submit" onClick={handleSubmit}>
              Save
            </button>
            <button type="reset" onClick={handleReset}>
              Cancel
            </button>
          </form>
        </>
      ) : (
        <div className="no-records"></div>
      )}
    </div>
  );
}