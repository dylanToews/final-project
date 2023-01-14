import { useContext } from "react"
import { AlarmContext } from "../context/AlarmProvider"
import axios from "axios"


export default function SoundListItem(props) {
  const { sound_name, sound_url, id } = props;
  const { setSoundItems } = useContext(AlarmContext);

  const removeSound = (id) => {
    const filtered = (current) =>
      current.filter((sound) => {
        return sound.id !== id;
      });
      setSoundItems(filtered)
      axios.delete(`api/v1/soundItems/${id}`).then((res) => {
  })
  }

  return (
    <li className="SoundListItem">
      <div key={id}>
      <p>Sound Title: {sound_name}</p><br />
      <audio controls controlsList="nodownload" src={`/audio/${sound_url}`}></audio>
      <button onClick={() => removeSound(id)}>Delete</button>

      </div>
    </li>
  )
}