const db = require("../../configs/db.config");

const getAllAlarms = () => {
  return db.query("SELECT * FROM alarms;").then(data => {
    return data.rows;
  });
};

const getAlarmsForUser = userId => {
  return db.query("SELECT * FROM alarms WHERE user_id = $1;", [userId])
    .then(data => data.rows);
};

const getAlarmDataByEmail = email => {
  return db.query(
    `SELECT 
      alarms.id AS id,
      users.email AS user_email,
      contacts.name AS contact_name,
      contacts.tel_number AS contact_number,
      sounds.name AS sound_name,
      sounds.file_name AS sound_string,
      hour,
      minute,
      am_pm
      FROM alarms
      JOIN sounds ON sound_id = sounds.id
      JOIN contacts ON contact_id = contacts.id
      JOIN users ON alarms.user_id = users.id
      WHERE users.email = $1;
    `, [email]
  )
  .then((data) => data.rows);
};

module.exports = { getAllAlarms, getAlarmsForUser, getAlarmDataByEmail }