// may be unnecessary 

export default function UserListItem(props) {
  const { name } = props;


  return (

  <select name="selectuser">
  <option value="userOption1">{name}</option>
  <option value="userOption2">Select user 2</option>
  <option value="userOption2">Select user 3</option>
</select>

  )
}

