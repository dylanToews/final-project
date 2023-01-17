import { useState, useContext } from "react";
import axios from "axios";
import { AlarmContext } from "../context/AlarmProvider";
import { authContext } from "../../providers/AuthProvider";
import {Button} from "react-bootstrap"

import "../../styles/Cards.css"
import "../../styles/AlarmOption.css";
import "../../styles/Sounds.css";


export default function RecordingsList(props) {
  const { soundItems, setSoundItems } = useContext(AlarmContext);

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

    if (recordings.length > 0) {
      const audioFormData = new FormData();
      audioFormData.append("sound", recordings[0].audio);
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
          axios.post("/api/v1/soundItems", {newSoundItem}).then((res) => {
            newSoundItem.id = res.data.id;
            setSoundItems([...soundItems, newSoundItem]);
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
    <div>
      {recordings.length > 0 ? (
        <div className="SoundFormat">
          <h1>New Recording</h1>
          <form className="SoundForm option-Container card-background card">
            <input
              type="text"
              name="sound_name"
              placeholder="Enter a title for your new sound..."
              className="inputBox"
              maxLength="28"
              size="30"
              onChange={handleChange}
              value={formData.sound_name}
            />

            <div className="SoundOptions">
              <Button variant="outline-secondary" type="submit" onClick={handleSubmit} className="SaveSound">
                Save
              </Button>
              <Button variant="outline-secondary" type="reset" onClick={handleReset} className="AbandonSound">
                Cancel
              </Button>
            </div>

          </form>
        </div>
      ) : (
        <div className="no-records"></div>
      )}
    </div>
  );
}

// {/* <button type="submit" onClick={handleSubmit}>
//               Save
//             </button>
//             <button type="reset" onClick={handleReset}>
//               Cancel
//             </button> */}