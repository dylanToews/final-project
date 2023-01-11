import { useEffect } from "react";
import axios from "axios";
import "./recordings-list.css";

export default function RecordingsList(props) {
  const { recordings, deleteAudio } = props;

  



  useEffect(() => {
    if (recordings.length > 0) {
      const formData = new FormData();
      formData.append("sound", recordings[0].audio);
      console.log(...formData);
      axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
        .then(res => {
          console.log("server: ", res.data)
        });

    } 
  }, [recordings])

  // below src={record.audio} in audio element does not work, as it is expecting a file URL, and audio has changed to be the file itself.
  // next steps will be to render a soundlist from the back end, and we won't need this map anymore (we will still need cancel button I think!)
  // already fixed, actually - still a temporary measure in order to clear the temp file from the state
  return (
    <div className="recordings-container">
      {recordings.length > 0 ? (
        <>
          <h1>Your recordings</h1>
          <div className="recordings-list">
            {recordings.map((record) => (
              <div className="record" key={record.key}>
                <div className="delete-button-container">
                  <button
                    className="delete-button"
                    title="Delete this audio"
                    onClick={() => deleteAudio(record.key)}
                  >
                    Record another!
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="no-records">
          <span>You don't have any recordings</span>
        </div>
      )}
    </div>
  );
}