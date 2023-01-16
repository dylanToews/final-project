import RecorderControls from '../components/RecorderControls';
import SoundForm from '../components/Sounds/SoundForm';
import SoundList from '../components/Sounds/SoundList';

import useRecorder from '../hooks/useRecorder';
import useRecordingsList from '../hooks/useRecordingsList';

import "../styles/Contacts.css"
import "../styles/Cards.css"



function Sounds() {
  const { recorderState, ...handlers } = useRecorder();
  const { audio } = recorderState;
  const { recordings, deleteAudio } = useRecordingsList(audio);

    return (
      <section className="Contacts">
      <div className="recorder-container">
      
        {recordings.length === 0 && 
        <>
          <h1 className="title">Add a New Sound</h1>
          <RecorderControls recorderState={recorderState} handlers={handlers} className="card"/>
        </>
        }
        <SoundForm recordings={recordings} deleteAudio={deleteAudio} />
      </div>
      <SoundList />
    </section>
    );
}

export default Sounds;