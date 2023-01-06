import AlarmListItem from "./AlarmListItem";

export default function AlarmList(props) {
  const { alarmItems } = props;
  const isArray = Array.isArray(alarmItems)


  const parsedAlarmItems = isArray && alarmItems.map((alarmItem) => (
    <AlarmListItem key={alarmItem.id} {... alarmItem} />
  ))



  return (
    <section className="AlarmList">
      <h2>Existing Alarms</h2>
      {!isArray && <p>There are currently no contacts</p>}
      <ul>
        {[parsedAlarmItems]}
      </ul>
    </section>
  );
}
 