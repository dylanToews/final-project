import { useContext } from "react";
import { alarmContext } from "../../context/AlarmProvider";
import SoundListItem from "./SoundListItem";
import "../../styles/Contacts.css"


export default function SoundList() {
  const { soundItems } = useContext(alarmContext);

  const parsedSoundItems = soundItems.map((soundItem) => (
    <SoundListItem key={soundItem.id} {...soundItem} />
  ));

  return (
    <section className="SoundList">
      <h2>My Sounds</h2>
      <br />
      <ul>
        {[parsedSoundItems]}
      </ul>
    </section>
  );
}
