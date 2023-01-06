export default function SetAlarmForm(props) {
  return (
    <form className="SetAlarmForm">
      <h2>Choose Time</h2>
      <input type="text" name="alarmTime" placeholder="Enter time" />

      <h2>Select Contact </h2>
      <select name="selectContact">
        <option value="contactOption1">Select Contact 1</option>
        <option value="contactOption2">Select Contact 2</option>
        <option value="contactOption2">Select Contact 3</option>
      </select>

      <h2>Select Sound </h2>
      <select name="selectsound">
        <option value="soundOption1">Select sound 1</option>
        <option value="soundOption2">Select sound 2</option>
        <option value="soundOption2">Select sound 3</option>
      </select>
      <br></br>
      <button>Add Alarm </button>
    </form>
  );
}
