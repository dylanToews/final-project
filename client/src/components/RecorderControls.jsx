import { formatMinutes, formatSeconds } from "../helpers/soundHelpers";
import { Button } from "react-bootstrap";

import "../styles/recorder-controls.css"
import "../styles/Cards.css"

export default function RecorderControls({ recorderState, handlers}) {
  const { recordingMinutes, recordingSeconds, initRecording } = recorderState;
  const { startRecording, saveRecording, cancelRecording } = handlers;

  return (
    <div className="controls-container card card-background" >
      <div className="recorder-display card-background">
        {initRecording && <div className="recording-time card-background">
          <span className="card-background">{formatMinutes(recordingMinutes)}</span>
          <span className="card-background">:</span>
          <span className="card-background">{formatSeconds(recordingSeconds)}</span>
        </div>}
        
        {initRecording && (
          <div className="cancel-button-container card-background">
            <Button variant="outline-secondary" onClick={cancelRecording}>
            Cancel
          </Button>
          </div>
        )}
      </div>
      <div className="start-button-container card-background">
        {initRecording ? (
          <div data-role="controls" className="card-background">
            <button
              data-recording="true"
              className="save-button card-background"
              title="Save recording"
              disabled={recordingSeconds === 0}
              onClick={saveRecording}
              >
              Stop
            </button>
            <p className="card-background"> click to finish recording!</p>
          </div>
        ) : (
          <div data-role="controls" className="card-background">
            <button onClick={startRecording} className="start-button">
              Start
            </button>
            <p className="card-background"> click to start recording!</p>
          </div>
        )}
      </div>
    </div>
  );
}