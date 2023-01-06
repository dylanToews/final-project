import AlarmListItem from "./AlarmListItem";

export default function AlarmList(props) {
  const { contacts } = props;
  const isArray = Array.isArray(contacts)

  const parsedContacts = isArray && contacts.map((contact) => (
    <AlarmListItem key={contact.id} {... contact} />
  ))
  return (
    <section className="AlarmList">
      <h2>Existing Alarms</h2>
      {!isArray && <p>There are currently no contacts</p>}
      <ul>{parsedContacts}</ul>
    </section>
  );
}
 