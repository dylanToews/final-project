// setup and middleware imports
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const sendTwilio = require("./twilio/send_sms");

// database
const db = require("./configs/db.config");

// express app
const app = express();

// start middleware and configs
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

// Multer storage
const DIR = "./public/audio"; // Sound data file storage - must be in public folder for current acceess methods
const audioStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    console.log("file before rename: ", file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadAudio = multer({ storage: audioStorage });


// partially used routes
const usersRouter = require("./routes/users");
const contactsRouter = require("./routes/contacts");
const soundsRouter = require("./routes/sounds");
const alarmsRouter = require("./routes/alarms");
// partially used routers
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/contacts", contactsRouter);
app.use("/api/v1/sounds", soundsRouter);
app.use("/api/v1/alarms", alarmsRouter);


// MULTER // for audio upload
app.post("/upload", uploadAudio.single("sound"), (req, res) => {
  res.send(req.file.filename);
});

// TWILIO // for sending SMS notification

app.post("/api/v1/sendSMS", (req, res) => {
  const twilioData = req.body.twilioData;
  sendTwilio(twilioData);
  res.send("text sent successfully");
});

///ALARM ITEMS  - Query Functions///

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
      minute AS minutes,
      am_pm,
      active
      FROM alarms
      JOIN sounds ON sound_id = sounds.id
      JOIN contacts ON contact_id = contacts.id
      JOIN users ON alarms.user_id = users.id
      WHERE users.email = $1;
    `, [email]
  )
  .then((data) => data.rows)
};

const addAlarmItem = (newAlarmItem) => {
  return db.query(`
    INSERT INTO alarms (user_id, sound_id, contact_id, hour, minute, am_pm) 
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id
    `, [
        newAlarmItem.user_id, 
        newAlarmItem.sound_id, 
        newAlarmItem.contact_id, 
        newAlarmItem.hour, 
        newAlarmItem.minutes, 
        newAlarmItem.am_pm
      ]
  )
  .then((data) => data.rows[0])
  // return the created alarm id
};

const deleteAlarmItem = (id) => {
  return db
    .query("DELETE FROM alarms WHERE id = $1", [id])
    .then((data) => data.rows)
    .catch((err) => console.error(err.stack));
};

// update query to toggle active state true/false
const toggleAlarmActive = (id) => {
  return db
    .query(`UPDATE alarms SET active = NOT active WHERE id = $1`, [id])
    .then((data) => data.rows)
    .catch((err) => console.error(err.stack));
}

///ALARM ITEMS - Routes

app.get("/api/v1/alarmItems/:email", (req, res) => {
  getAlarmDataByEmail(req.params.email).then((alarmItems) => res.json(alarmItems));
});

app.post("/api/v1/alarmItems", (req, res) => {
  const { newAlarmItem } = req.body;

  addAlarmItem(newAlarmItem).then((data) => res.json(data));
});

app.delete("/api/v1/alarmItems/:id", (req, res) => {
  const alarmItemId = req.params.id;
  deleteAlarmItem(alarmItemId).then((data) => res.send(data));
});

// PUT for toggle active / inactive
app.put("/api/v1/alarmItems/:id", (req, res) => {
  const alarmItemId = req.params.id;
  toggleAlarmActive(alarmItemId).then((data) => res.send(data));
});

/// SOUND - Query Functions ///

const getSoundItems = (user_email) => {
  return db.query(`
    SELECT
      sounds.id AS id,
      users.email AS user_email,
      sounds.name AS sound_name,
      sounds.file_name AS sound_url
      FROM sounds
      JOIN users ON sounds.user_id = users.id
      WHERE users.email = $1
    `, [user_email]
  )
  .then((data) => data.rows);
};

const addSoundItem = (newSoundItem) => {
  return db.query(`
    INSERT INTO sounds (user_id, name, file_name)
    VALUES ($1, $2, $3)
    RETURNING id
  `, [newSoundItem.user_id, newSoundItem.sound_name, newSoundItem.sound_url]
  )
  .then((data) => data.rows[0])
   // returning the created sound id
};


const deleteSoundItem = (id) => {
  return db
    .query("DELETE FROM sounds WHERE id = $1 RETURNING file_name;", [id])
    .then((data) => data.rows)
    .catch((err) => console.error(err.stack));
};

// SOUND -  Routes //

app.get("/api/v1/soundItems/:email", (req, res) => {
  getSoundItems(req.params.email).then((soundItems) => {
    res.json(soundItems)
  });
});

app.post("/api/v1/soundItems", (req, res) => {
  const { newSoundItem } = req.body;
  console.log(newSoundItem);
  addSoundItem(newSoundItem).then((data) => res.send(data));
});

app.delete("/api/v1/soundItems/:id", (req, res) => {
  const soundItemId = req.params.id;
  deleteSoundItem(soundItemId).then((data) => {
    const deletedFile = data[0].file_name;
    fs.unlink(`./public/audio/${deletedFile}`, (err => {
      if (err) console.log(err);
      else {
        console.log("sound file deleted: ", deletedFile);
      }
    }));
    res.send(data);
  });
});

/// CONTACTS - FUNCTIONS ////////

const getContactItems = (user_email) => {
  return db.query(`
    SELECT 
      contacts.id AS id,
      users.email AS user_email,
      contacts.name AS contact_name,
      contacts.tel_number AS contact_number
      FROM contacts
      JOIN users ON contacts.user_id = users.id
      WHERE users.email = $1
    `, [user_email]
    )
    .then((data) => data.rows);
};

const addContactItems = (newContactItem) => {
  return db.query(`
    INSERT INTO contacts (user_id, name, tel_number)
    VALUES ($1, $2, $3)
    RETURNING id
  `, [newContactItem.user_id, newContactItem.contact_name, newContactItem.contact_number]
  )
  .then((data) => data.rows[0])
   // returning the created contact id
};


const deleteContactItem = (id) => {
  return db
    .query("DELETE FROM contacts WHERE id = $1", [id])
    .then((data) => data.rows)
    .catch((err) => console.error(err.stack));
};

///CONTACTS - Routes ///

app.get("/api/v1/contactItems/:email", (req, res) => {
  getContactItems(req.params.email).then((contactItems) => res.json(contactItems));
});

app.post("/api/v1/contactItems", (req, res) => {
  const { newContactItem } = req.body;
  const formattedNumber = newContactItem.contact_number.replace(/\D/g,'');
  newContactItem.contact_number = formattedNumber;
  addContactItems(newContactItem)
    .then((data) => res.send(data))
});

app.delete("/api/v1/contactItems/:id", (req, res) => {
  const contactItemId = req.params.id;
  deleteContactItem(contactItemId).then((data) => res.send(data));
});


module.exports = app;
