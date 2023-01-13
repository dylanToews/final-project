// import {Howl} from "howler";

export default function SoundListItem(props) {

// const audioTest = "http://codeskulptor-demos.commondatastorage.googleapis.com/descent/background%20music.mp3"

// const soundPlay = (src) => {
//   const sound = new Howl ({
//     src,
//     html5: true,
//     loop: true
//   })
//   sound.play()
// }

// soundPlay(audioTest)


  return (
    <li className="SoundListItem">
      <p>Sound Title</p><br />
      <audio controls controlsList="nodownload" src="http://localhost:8080/audio/1673469843174.ogg"></audio>
    </li>
  )
}