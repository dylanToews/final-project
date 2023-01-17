import { useContext } from "react";
import { AlarmContext } from "../context/AlarmProvider";
import SoundListItem from "./SoundListItem";
import "../../styles/Contacts.css"


export default function SoundList() {
  const { soundItems } = useContext(AlarmContext);

  const parsedSoundItems = soundItems.map((soundItem) => (
    <SoundListItem key={soundItem.id} {...soundItem} />
  ));

  return (
    <section className="SoundList SoundFormat">
      <h2 className="title-text">My Sounds</h2>
      <br />
      <div>
        {[parsedSoundItems]}
      </div>
    </section>
  );
}
