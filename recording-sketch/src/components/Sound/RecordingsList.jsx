

import useRecordingsList from "../../hooks/useRecordingsList";
import "../../styles/recordings-list.scss"

export default function RecordingsList(props) {
  const { recordings, deleteAudio } = props;

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