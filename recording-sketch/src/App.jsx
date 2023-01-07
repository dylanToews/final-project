import { useState } from 'react';

import CategoryForm from './components/Sound/CategoryForm';
import Header from './components/Sound/Header';
import SoundForm from './components/Sound/SoundForm';
import SoundList from './components/Sound/SoundList';

import RecorderControls from './components/Sound/RecorderControls';
import RecordingsList from './components/Sound/RecordingsList';
import useRecorder from './hooks/useRecorder';
import useRecordingsList from './hooks/useRecordingsList';

import './App.scss';

import mockSounds from './data/mockSoundData';

// recorderState example:
// {
//   recordingMinutes: 0,
//   recordingSeconds: 0,
//   initRecording: false,
//   mediaStream: null,
//   mediaRecorder: null,
//   audio: null
// };

function App() {
  const { recorderState, ...handlers } = useRecorder();
  const { audio } = recorderState;
  const { recordings, deleteAudio } = useRecordingsList(audio);


  const [sounds, setSounds] = useState(mockSounds);

  return (
    <div className="App">
      <Header />
      <main>
        <section>
          <SoundForm />
          <CategoryForm />
        </section>
        <SoundList sounds={sounds} />
      </main>
      <section className="voice-recorder">
        <h1 className="title">Voice Recorder</h1>
        <div className="recorder-container">
          {recordings.length === 0 && <RecorderControls recorderState={recorderState} handlers={handlers} />}
          <RecordingsList recordings={recordings} deleteAudio={deleteAudio} />
        </div>
      </section>
    </div>
  );
}

export default App;
