import { useContext } from "react";
import { alarmContext } from "../../context/AlarmProvider";
import AlarmListItem from "./AlarmListItem";
import ReactCardFlip from "react-card-flip";

export default function AlarmList(props) {
  const { alarmItems, alarmFlip, setAlarmFlip, alarmFlipId, setAlarmFlipId } = useContext(alarmContext);

  alarmItems.sort(
    (p1, p2) => (p1.order_val < p2.order_val) ? -1 : (p1.order_val > p2.order_val) ? 1 : 0);

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
 