const db = require("../../configs/db.config");

const getAlarmDataByEmail = email => {
  return db.query(
    `SELECT 
      alarms.id AS id,
      users.email AS user_email,
      alarms.name AS alarm_name,
      contacts.name AS contact_name,
      contacts.tel_number AS contact_number,
      sounds.name AS sound_name,
      sounds.file_name AS sound_string,
      hour,
      minute AS minutes,
      am_pm,
      order_val,
      active
      FROM alarms
      JOIN sounds ON sound_id = sounds.id
      JOIN contacts ON contact_id = contacts.id
      JOIN users ON alarms.user_id = users.id
      WHERE users.email = $1
      ORDER BY am_pm, alarms.hour, alarms.minute;
    `, [email]
  )
  .then((data) => data.rows)
};

const addAlarmItem = (newAlarmItem) => {
  return db.query(`
    INSERT INTO alarms (user_id, sound_id, contact_id, name, hour, minute, am_pm, order_val) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING id;
    `, [
        newAlarmItem.user_id, 
        newAlarmItem.sound_id, 
        newAlarmItem.contact_id, 
        newAlarmItem.alarm_name,
        newAlarmItem.hour, 
        newAlarmItem.minutes, 
        newAlarmItem.am_pm,
        newAlarmItem.order_val
      ]
  )
  .then((data) => data.rows[0])
  // return the created alarm id
};

const updateAlarmItem = (alarmUpdateParams) => {
  return db
    .query(`UPDATE alarms 
    SET sound_id = $1, 
      contact_id = $2, 
      hour = $3, 
      minute = $4, 
      am_pm = $5,
      name = $6,
      order_val = $7
    WHERE id = $8
    RETURNING *;
    `, [
        alarmUpdateParams.sound_id, 
        alarmUpdateParams.contact_id,
        alarmUpdateParams.hour,
        alarmUpdateParams.minutes,
        alarmUpdateParams.am_pm,
        alarmUpdateParams.alarm_name,
        alarmUpdateParams.order_val,
        alarmUpdateParams.id,
      ]
  )
  .then((data) => data.rows)
};

const deleteAlarmItem = (id) => {
  return db
    .query("DELETE FROM alarms WHERE id = $1;", [id])
    .then((data) => data.rows)
    .catch((err) => console.error(err.stack));
};

const toggleAlarmActive = (id) => {
  return db
    .query(`UPDATE alarms SET active = NOT active WHERE id = $1;`, [id])
    .then((data) => data.rows)
    .catch((err) => console.error(err.stack));
}

module.exports = { 
  getAlarmDataByEmail,
  addAlarmItem,
  updateAlarmItem,
  deleteAlarmItem,
  toggleAlarmActive
}