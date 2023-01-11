const db = require("../../configs/db.config");

const getAllAlarms = () => {
  return db.query("SELECT * FROM alarms;").then(data => {
    return data.rows;
  });
};

const getAlarmsByUser = userId => {
  return db.query("SELECT * FROM alarms WHERE user_id = $1;", [userId])
    .then(data => data.rows);
};

const getAlarmDataById = id => {
  return db.query(
    `SELECT sounds.url AS sound_path, contacts.tel_number AS contact_number, users.id AS user_id
    FROM alarms
    JOIN sounds ON sound_id = sounds.id
    JOIN contacts ON contact_id = contacts.id
    JOIN users ON alarms.user_id = users.id
    WHERE alarms.id = $1;
    `, [id]
  )
  .then((data) => data.rows);
};

module.exports = { getAllAlarms, getAlarmsByUser, getAlarmDataById }