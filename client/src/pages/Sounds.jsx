import RecorderControls from '../components/Sounds/RecorderControls';
import SoundForm from '../components/Sounds/SoundForm';
import SoundList from '../components/Sounds/SoundList';

import useRecorder from '../hooks/useRecorder';
import useRecordingsList from '../hooks/useRecordingsList';

function Sounds() {
  const { recorderState, ...handlers } = useRecorder();
  const { audio } = recorderState;
  const { recordings, deleteAudio } = useRecordingsList(audio);

    return (
      <section className="App">
      <h1 className="title">Voice Recorder</h1>
      <div className="recorder-container">
        {recordings.length === 0 && <RecorderControls recorderState={recorderState} handlers={handlers} />}
        <SoundForm recordings={recordings} deleteAudio={deleteAudio} />
      </div>
      <SoundList />
    </section>
    );
}

export default Sounds;