import { useContext } from "react";
import { AlarmContext } from "../context/AlarmProvider";
import AlarmListItem from "./AlarmListItem";
import ReactCardFlip from "react-card-flip";
import AlarmOption from "../AlarmOption/AlarmOption";

export default function AlarmList(props) {
  const { alarmItems, alarmFlip, setAlarmFlip, alarmFlipId, setAlarmFlipId } = useContext(AlarmContext);

  const checkAlarmFlipId = () => {


  }

  const parsedAlarmItems = alarmItems.map((alarmItem, index) => (
    <AlarmListItem key={alarmItem.id} {... alarmItem} />

  ))

  return (
    <section className="AlarmList">
      <br/><br/>
      <h2>My Alarms</h2>
      <br/>
      
        {[parsedAlarmItems]}
      
    </section>
  );
}
 