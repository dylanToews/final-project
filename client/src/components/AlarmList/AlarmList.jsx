import { useContext } from "react";
import { AlarmContext } from "../context/AlarmProvider";
import AlarmListItem from "./AlarmListItem";

export default function AlarmList(props) {
  const { alarmItems } = useContext(AlarmContext);

  // relevant keys from alarmItem: 
  // am_pm: string, "AM" or "PM"
  // hour : string, 01-12
  // minutes: string, 00-59

  // const arrangedAlarmItems = alarmItems.sort(
  //   (a1, a2) => (a1.)
  // )

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
 