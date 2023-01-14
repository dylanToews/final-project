import { useContext } from "react";
import { AlarmContext } from "../context/AlarmProvider";
import AlarmListItem from "./AlarmListItem";

export default function AlarmList(props) {
  const { alarmItems } = useContext(AlarmContext);

  const parsedAlarmItems = alarmItems.map((alarmItem) => (
    <AlarmListItem key={alarmItem.id} {... alarmItem} />
  ))

  return (
    <section className="AlarmList">
      <br/><br/>
      <h2>My Alarms</h2>
      <br/>
      <ul>
        {[parsedAlarmItems]}
      </ul>
    </section>
  );
}
 