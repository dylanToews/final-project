

import { useEffect } from "react";
import axios from "axios";
import useRecordingsList from "../../hook/useRecordingsList";
import "./recordings-list.css";

export default function RecordingsList(props) {
  const { recordings, deleteAudio } = props;

  



  useEffect(() => {
    if (recordings.length > 0) {
      const formData = new FormData();
      console.log(recordings[0]);
      formData.append("sound", recordings[0].audio);
      axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
        .then(res => {
          console.log("success?: ", res.data)
        });

    } 
  }, [recordings])

  return (
    <div className="recordings-container">
      {recordings.length > 0 ? (
        <>
          <h1>Your recordings</h1>
          <div className="recordings-list">
            {recordings.map((record) => (
              <div className="record" key={record.key}>
                <audio controls controlsList="nodownload" src={record.audio} />
                <div className="delete-button-container">
                  <button
                    className="delete-button"
                    title="Delete this audio"
                    onClick={() => deleteAudio(record.key)}
                  >
                    Cancel
                  </button><br />
                  <a href={record.audio} target="_blank">Download this audio</a>
                  
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