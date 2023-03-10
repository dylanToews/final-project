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
          <br/><h1 className="title-text">Add a New Sound</h1>
          <RecorderControls recorderState={recorderState} handlers={handlers} className="card"/>
        </div>
        }
        <br/>
        <SoundForm recordings={recordings} deleteAudio={deleteAudio} />
      </div>
      <div className="SoundFormat">
        <SoundList />
      </div>
      <br/>
      <br/>
   
    </section>
    );
}

export default Sounds;