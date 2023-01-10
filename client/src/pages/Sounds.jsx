import { useState } from 'react';

import RecorderControls from '../components/Sounds/RecorderControls';
import RecordingsList from '../components/Sounds/RecordingsList';
import useRecorder from '../hook/useRecorder';
import useRecordingsList from '../hook/useRecordingsList';

function Sounds() {
  const { recorderState, ...handlers } = useRecorder();
  const { audio } = recorderState;
  const { recordings, deleteAudio } = useRecordingsList(audio);

    return (
      <section className="voice-recorder">
      <h1 className="title">Voice Recorder</h1>
      <div className="recorder-container">
        {recordings.length === 0 && <RecorderControls recorderState={recorderState} handlers={handlers} />}
        <RecordingsList recordings={recordings} deleteAudio={deleteAudio} />
      </div>
    </section>
    );
}

export default Sounds;