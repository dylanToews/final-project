import { useState, useContext } from "react";
import AlarmListItem from "./AlarmListItem";
// import { getFilteredUsers, getUserAlarms } from "../../helpers/userHelpers";
import { AlarmContext } from "../context/AlarmProvider";

export default function AlarmList(props) {
  // const [filter, setFilter] = useState(null)
  const { alarmItems } = useContext(AlarmContext)



  // const filteredAlarmItems = getFilteredUsers(alarmItems, filter)

  const parsedAlarmItems = alarmItems.map((alarmItem) => (
    <AlarmListItem key={alarmItem.id} {... alarmItem} />
  ))



  // Buttons for choosing which alarms to display based on user. Leftover logic from the Francis lecture. May be useful for auth but most likely not

  // const parsedButton = getUserAlarms(alarmItems).map((user) => (
  //   <button onClick={
  //     () => setFilter(user)
  //   }>{user}</button>
  // ));

  return (
    <section className="AlarmList">
      <h2>Existing Alarms</h2>
      <br/>
      <ul>
        {[parsedAlarmItems]}
      </ul>
    </section>
  );
}
 