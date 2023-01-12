import { useEffect, useState } from "react";
import axios from "axios";
import "./recordings-list.css";

export default function RecordingsList(props) {
  const { recordings, deleteAudio } = props;

  const initialValues = {
    title: "",
    url: ""
  };

  const [formData, setFormData] = useState(initialValues);


  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  };
  

  const handleSubmit = (event) => {
    event.preventDefault();
    if (recordings.length > 0) {
      const audioFormData = new FormData();
      audioFormData.append("sound", recordings[0].audio);
      console.log(...audioFormData);
      axios.post("/upload", audioFormData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
        .then(res => res.data)
        .then(filename => {
          const newSound = {
            ...formData,
            url: filename
          };
          console.log("new sound?: ", newSound);
          axios.post("/api/v2/sounds", {newSound}).then((res) => {
            deleteAudio(recordings[0].key);
            setFormData(initialValues);
          });
        });

    } 
  }

  // below src={record.audio} in audio element does not work, as it is expecting a file URL, and audio has changed to be the file itself.
  // next steps will be to render a soundlist from the back end, and we won't need this map anymore (we will still need cancel button I think!)
  // already fixed, actually - still a temporary measure in order to clear the temp file from the state
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
            <button onClick={handleSubmit}>
              Save and go back
            </button>
          </form>
        </>
      ) : (
        <div className="no-records"></div>
      )}
    </div>
  );
}