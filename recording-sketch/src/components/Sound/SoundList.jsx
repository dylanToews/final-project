import SoundListItem from "./SoundListItem";

export default function SoundList(props){
  const { sounds } = props;
  const isArray = Array.isArray(sounds);

  const parsedSounds = 
    isArray && 
    sounds.map(sound => (
      <SoundListItem key={sound.id} {...sound} />
    ));

  return (
    <section className="SoundList">
          <h2>Existing Sounds</h2>
          {!isArray && <p>No Sounds Available</p>}
          <ul>{parsedSounds}</ul>
        </section>
  )
}