import { useState } from "react";
import { getFilteredSounds, getSoundCategories } from "../../handlers/soundHelpers";
import SoundListItem from "./SoundListItem";

export default function SoundList(props){
  const [filter, setFilter] = useState(null);

  const { sounds } = props;

  const filteredSounds = getFilteredSounds(sounds, filter)

  const parsedSounds = filteredSounds.map(sound => (
      <SoundListItem key={sound.id} {...sound} />
    ));

  return (
    <section className="SoundList">
          <h2>Existing Sounds</h2>
          <button onClick={() => setFilter(null)}>All</button>
          {getSoundCategories(sounds).map(category => <button onClick={() => setFilter(category)}>{category}</button>)}
          {!filteredSounds.length === 0 && <p>No Sounds Available</p>}
          <ul>{parsedSounds}</ul>
        </section>
  )
}