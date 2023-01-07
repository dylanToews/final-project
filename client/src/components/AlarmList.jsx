import { useState } from "react";
import AlarmListItem from "./AlarmListItem";
import { getFilteredUsers, getUserAlarms } from "../helpers/userHelpers";

export default function AlarmList(props) {
  const [filter, setFilter] = useState(null)

  const { alarmItems } = props;

  const filteredAlarmItems = getFilteredUsers(alarmItems, filter)

  const parsedAlarmItems = filteredAlarmItems.map((alarmItem) => (
    <AlarmListItem key={alarmItem.id} {... alarmItem} />
  ))

  const parsedButton = getUserAlarms(alarmItems).map((user) => (
    <button onClick={
      () => setFilter(user)
    }>{user}</button>
  ));

  return (
    <section className="AlarmList">
      <h2>Existing Alarms</h2>
      {parsedButton}
      {!filteredAlarmItems.length === 0 && <p>There are currently no contacts</p>}
      <ul>
        {[parsedAlarmItems]}
      </ul>
    </section>
  );
}
 