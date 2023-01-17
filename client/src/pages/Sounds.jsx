import RecorderControls from '../components/Sounds/RecorderControls';
import SoundForm from '../components/Sounds/SoundForm';
import SoundList from '../components/Sounds/SoundList';

import useRecorder from '../hooks/useRecorder';
import useRecordingsList from '../hooks/useRecordingsList';

import "../styles/Contacts.css"
import "../styles/Cards.css"
import "../styles/Sounds.css"



function Sounds() {
  const { recorderState, ...handlers } = useRecorder();
  const { audio } = recorderState;
  const { recordings, deleteAudio } = useRecordingsList(audio);

    return (
      <section className="Contacts">
      <div className="recorder-container SoundFormat">
      
        {recordings.length === 0 && 
        <div className="SoundFormat">
          <h1>Add a New Sound</h1>
          <RecorderControls recorderState={recorderState} handlers={handlers} className="card"/>
        </div>
        }
        <SoundForm recordings={recordings} deleteAudio={deleteAudio} />
      </div>
      <div className="SoundFormat">
        <SoundList />
      </div>
    </section>
    );
}

export default Sounds;