import SoundListItem from "./SoundListItem";


export default function SoundList() {


  return (
    <section className="SoundList">
      <h2>My Sounds</h2>
      <br/>
      <ul>
        <SoundListItem />
        <SoundListItem />
      </ul>
    </section>
  )
};