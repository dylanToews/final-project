export default function AlarmListItem(props) {
  const { time, contact, sound } = props;

  console.log(props)
  return (
    <li className="AlarmListItem">
      <p>Time: {time}</p>
      <p>Contact Name: {contact}</p>
      <p>Sound: {sound}</p>
    </li>
  );
}
