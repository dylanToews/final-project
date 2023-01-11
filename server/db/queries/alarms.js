const db = require("../../configs/db.config");

const getAllAlarms = () => {
  return db.query("SELECT * FROM alarms;").then(data => {
    return data.rows;
  });
}

const getAlarmsByUser = userId => {
  return db.query("SELECT * FROM alarms WHERE user_id = $1;", [userId])
    .then(data => data.rows);
}

module.exports = { getAllAlarms, getAlarmsByUser }