import { useState, useContext } from "react";
import axios from "axios";
import { AlarmContext } from "../context/AlarmProvider";
import { authContext } from "../../providers/AuthProvider";


export default function RecordingsList(props) {
  const { soundItems, setSoundItems, soundLastId, setSoundLastId } = useContext(AlarmContext);

  const { recordings, deleteAudio } = props;
  const {user} = useContext(authContext)

  const user_email = user.email

  const initialValues = {
    user_email, 
    sound_name: "",
    sound_url: ""
   };

  const [formData, setFormData] = useState(initialValues);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

  };
  
  // two-part submit: file goes to backend public folder, file references go to db
  const handleSubmit = (event) => {
    event.preventDefault();

    const id = soundLastId + 1

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
          const newSoundItem = {
            ...formData,
            user_id: user.id,
            sound_url: filename
          };
          console.log("new sound: ", newSoundItem);
          axios.post("/api/v1/soundItems", {newSoundItem}).then((res) => {
            newSoundItem.id = res.data.id;
            setSoundItems([...soundItems, newSoundItem])
            // setSoundLastId([id])
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
              name="sound_name"
              placeholder="Enter a title for your new sound"
              onChange={handleChange}
              value={formData.sound_name}
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