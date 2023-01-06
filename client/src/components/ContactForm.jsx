export default function ContactForm(props) {
  return (
    <form className="ContactForm">
    <h2>Add a new contact </h2>
    <input
      type="text"
      name="alarmContact"
      placeholder="Enter in new contact"
    />
    <select name="selectContact">
      <option value="contactOption1">Select Contact 1</option>
      <option value="contactOption2">Select Contact 2</option>
    </select>
    <button>Add Contact </button>
  </form>
  )

}