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
import { getSoundCategories } from './handlers/soundHelpers';

const VIEW = "VIEW";
const NEWSOUND = "NEWSOUND";
const NEWCATEGORY = "NEWCATEGORY";

function App() {
  const { recorderState, ...handlers } = useRecorder();
  const { audio } = recorderState;
  const { recordings, deleteAudio } = useRecordingsList(audio);


  const [sounds, setSounds] = useState(mockSounds);
  const [categories, setCategories] = useState(getSoundCategories(sounds));
  const [viewMode, setViewMode] = useState(VIEW);

  const addNewSound = (formData) => {
    const id = sounds.length + 1;
    const newSound = {id, ...formData}

    setSounds([...sounds, newSound]);

  };

  const addNewCategory = (formData) => {
    if (!categories.includes(formData.category)) {
      setCategories([...categories, formData.category])
    }


  }

  return (
    <div className="App">
      <Header />
      <main>
        <section>
          <button onClick={() => setViewMode(VIEW)}>View Sounds</button>
          <button onClick={() => setViewMode(NEWSOUND)}>Add New Sound</button>
          <button onClick={() => setViewMode(NEWCATEGORY)}>Add New Sound Category</button>
          {viewMode === NEWSOUND && <SoundForm onSubmit={addNewSound} categories={categories}/>}
          {viewMode === NEWCATEGORY && <CategoryForm onSubmit={addNewCategory}/>}
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
