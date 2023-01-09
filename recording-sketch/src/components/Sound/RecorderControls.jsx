

import { formatMinutes, formatSeconds } from "../../utils/format-time";
import "../../styles/recorder-controls.scss"

export default function RecorderControls({ recorderState, handlers}) {
  const { recordingMinutes, recordingSeconds, initRecording } = recorderState;
  const { startRecording, saveRecording, cancelRecording } = handlers;

  return (
    <div className="controls-contrainer">
      <div className="recorder-display">
        <div className="recording-time">
          {initRecording && <div className="recording-indicator"></div>}
          <span>{formatMinutes(recordingMinutes)}</span>
          <span>:</span>
          <span>{formatSeconds(recordingSeconds)}</span>
        </div>
        {initRecording && (
          <div className="cancel-button-container">
            <button className="cancel-button" title="Cancel recording" onClick={cancelRecording}>
              Cancel
            </button>
          </div>
        )}
      </div>
      <div className="start-button-container">
        {initRecording ? (
          <button
            className="save-button"
            title="Save recording"
            disabled={recordingSeconds === 0}
            onClick={saveRecording}
          >
            Save
          </button>
        ) : (
          <button className="start-button" title="Start recording" onClick={startRecording}>
            Start
          </button>
        )}
      </div>
    </div>
  );
}