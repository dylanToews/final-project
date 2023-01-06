export default function AlarmForm(props) {
  return (
    <form className="AlarmForm">
            <h2>Add a new alarm</h2>
            <input
              type="text"
              name="alarmTime"
              placeholder="Enter in the time of new alarm"/>
            <select name="selectTime">
              <option value="timeOption1">Select Time 1</option>
              <option value="timeOPtion2">Select TIme 2</option>
            </select>
            <button>Add Alarm </button>
          </form>
  )
}