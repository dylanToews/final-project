export default function SoundListItem(props) {


  return (
    <li className="SoundListItem">
      <p>Sound Title</p><br />
      <audio controls controlsList="nodownload" src="http://localhost:8080/audio/1673469843174.ogg"></audio>
    </li>
  )
}