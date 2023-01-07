import { useState } from "react";
import UserListItem from "./UserListItem";
import { getFilteredUsers, getUserAlarms } from "../helpers/userHelpers";
import AlarmList from "./AlarmList";
import AlarmListItem from "./AlarmListItem";

export default function UserList(props) {
  const [filter, setFilter] = useState(null);

  const { users } = props;

  const filteredUsers = getFilteredUsers(users, filter);

  const parsedUsers = filteredUsers.map((user) => (
    <UserListItem key={user.id} {...user} />
  ));

  const parsedButton = getUserAlarms(users).map((user) => (
    <button onClick={
      () => setFilter(user)
    }>{user}</button>
  ));

  // return (
  //   <section className="UserList">
  //     <h2>Select User</h2>

  //     {parsedButton}
  //     {!filteredUsers.length === 0 && <p>There are currently no users</p>}
  //     {/* <ul>{parsedUsers}</ul> */}
  //   </section>
  // );
}
