
export default function SoundForm(props){

  return (
    <form className="SoundForm">
            <h2>Add a New Sound</h2>

            <input type="text" name="title" placeholder="Enter a title!"/><br />
            <select name="category">
              <option value="Voice Recordings">Voice Recording</option>
              <option value="Sound Effects">Sound Effect</option>
              <option value="Song Clips">Song Clip</option>
            </select><br />
            <button>Add Sound</button>
          </form>
  )
}