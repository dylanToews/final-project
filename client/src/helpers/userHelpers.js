//Filter viewable alarms based on selected user 

export const getFilteredUsers = (users, filter) => {
  if (!Array.isArray(users)) {
    return [];
  }
  const filteredUsers = filter
    ? users.filter((user) => user.user === filter)
    : users;

  return filteredUsers;
};


//Get user values from alarmItemData

export const getUserAlarms = (users) => {
  if (!Array.isArray(users)) {
    return [];
  }
  const alarmsBuffer = {};
  users.forEach((user) => (alarmsBuffer[user.user] = 0));

  return Object.keys(alarmsBuffer);
};



//Get sound values from alarmItemData

export const getAlarmSounds = (users) => {
  if (!Array.isArray(users)) {
    return [];
  }
  const alarmsBuffer = {};
  users.forEach((user) => (alarmsBuffer[user.sound] = 0));

  return Object.keys(alarmsBuffer);
};


//Get user values from alarmItemData

export const getAlarmContact = (users) => {
  if (!Array.isArray(users)) {
    return [];
  }
  const alarmsBuffer = {};
  users.forEach((user) => (alarmsBuffer[user.contact] = 0));

  return Object.keys(alarmsBuffer);
};
