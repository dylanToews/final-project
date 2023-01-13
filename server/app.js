const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

///Mock Data///

const contactItems = require("./data/mockContactsData");
const alarmItems = require("./data/mockAlarmItemData");
const soundItems = require("./data/mockSoundData");

// Real Data //

const db = require("./configs/db.config");

//Multer middleware for file uploading
const multer = require("multer");
const fs = require("fs");
const sendTwilio = require("./twilio/send_sms");


const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

// Multer storage
const DIR = "./public/audio"; // Sound data file storage - must be in public for current acceess methods
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

// DB Query test router
const usersRouter = require("./routes/users");
const contactsRouter = require("./routes/contacts");
const soundsRouter = require("./routes/sounds");
const alarmsRouter = require("./routes/alarms");
// DB query test app.use
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/contacts", contactsRouter);
app.use("/api/v1/sounds", soundsRouter);
app.use("/api/v1/alarms", alarmsRouter);


// first attempt at login routes
// app.use("/login", (req, res) => {
//   res.send({
//     token: "test123",
//   });
// });

// eventually write db queries in functions below, i think?

// const getSomeDataExample = () => {
//   return db.query("SELECT * FROM data")
// }

// Multer upload test
app.post("/upload", uploadAudio.single("sound"), (req, res) => {
  res.send(req.file.filename);
  console.log(req.file.filename);

  fs.readdir(DIR, (err, files) => {
    files.forEach((file) => {
      console.log("files: ", file);
    });
  });
});








// TWILIO //

app.post("/api/v1/sendSMS", (req, res) => {
  const twilioData = req.body.twilioData
  console.log("twilioData:", twilioData);

  sendTwilio(twilioData)
});

///ALARM ITEMS  - Functions///

const getAlarmItems = (user_email) => {
  const sortedByUser = alarmItems.filter(function (el) {
    return el.user_email == user_email;
  });
  return Promise.resolve(sortedByUser);
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
      minute AS minutes,
      am_pm
      FROM alarms
      JOIN sounds ON sound_id = sounds.id
      JOIN contacts ON contact_id = contacts.id
      JOIN users ON alarms.user_id = users.id
      WHERE users.email = $1;
    `, [email]
  )
  .then((data) => data.rows)
};

const getAlarmItemsLastId = () => {
  const lastId = alarmItems.length;
  return Promise.resolve(lastId);
};

const addAlarmItem = (newAlarmItem) => {
  return db.query(`
    INSERT INTO alarms (user_id, sound_id, contact_id, hour, minute, am_pm) 
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id
    `, [newAlarmItem.user_id, newAlarmItem.sound_id, newAlarmItem.contact_id, newAlarmItem.hour, newAlarmItem.minutes, newAlarmItem.am_pm]
  )
  .then((data) => data.rows[0])
  // if this was DB call, return the created id
};

const deleteAlarmItem = (id) => {
  console.log("inside delete function with Alarm id:", id);
  return Promise.resolve("deleted");
};

///ALARM ITEMS - Routes

app.get("/api/v1/alarmItems/:email", (req, res) => {
  getAlarmDataByEmail(req.params.email).then((alarmItems) => res.json(alarmItems));
});




// app.get("/api/v1/alarmItemLastId", (req, res) =>
//   getAlarmItemsLastId().then((lastId) => res.json(lastId))
// );


// user_id instead of user_email
// sound_id instead of sound_name
// contact_id instead of contact_name

// below wil not work - need to get IDs from frontend. try above^
// newAlarmItem format coming from frontend:
// user_email: "cheever@fakeemail.com"
// sound_name: "Soft Wakeup"
// contact_name: "me"
// hour: "03"
// minutes: "03"
// amPmOption: "AM"

app.post("/api/v1/alarmItems", (req, res) => {
  const { newAlarmItem } = req.body;

  addAlarmItem(newAlarmItem).then((data) => res.json(data));
});

app.delete("/api/v1/alarmItems/:id", (req, res) => {
  //Delete function with query goes here !!
  const alarmItemId = req.params.id;
  deleteAlarmItem(alarmItemId).then((data) => res.send(data));
});

/// SOUND - Functions ///

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

const getSoundItemsLastId = () => {
  const lastId = soundItems.length;
  return Promise.resolve(lastId);
};

const addSoundItem = (newSoundItem) => {
  return db.query(`
    INSERT INTO sounds (user_id, name, file_name)
    VALUES ($1, $2, $3)
    RETURNING id
  `, [newSoundItem.user_id, newSoundItem.sound_name, newSoundItem.sound_url]
  )
  .then((data) => data.rows[0])
   // if this was DB call, return the created id
};


const deleteSoundItem = (id) => {
  console.log("inside delete function with Sound id:", id);
  return Promise.resolve("deleted");
};

// SOUND -  Routes //


app.get("/api/v1/soundItems/:email", (req, res) => {
  getSoundItems(req.params.email).then((soundItems) => {
    res.json(soundItems)
  });
});

app.get("/api/v1/soundItemsLastId", (req, res) =>
  getSoundItemsLastId().then((lastId) => res.json(lastId))
);

app.post("/api/v1/soundItems", (req, res) => {
  const { newSoundItem } = req.body;
  console.log(newSoundItem);
  addSoundItem(newSoundItem).then((data) => res.send(data));
});

app.delete("/api/v1/soundItems/:id", (req, res) => {
  //Delete function with query goes here !!
  const soundItemId = req.params.id;
  deleteSoundItem(soundItemId).then((data) => res.send(data));
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
   // if this was DB call, return the created id
};

const getContactItemsLastId = () => {
  const lastId = contactItems.length;
  return Promise.resolve(lastId);
};

const deleteContactItem = (id) => {
  console.log("inside delete function with contact id:", id);
  return Promise.resolve("deleted");
};

///CONTACTS - Routes ///

app.get("/api/v1/contactItems/:email", (req, res) => {
  getContactItems(req.params.email).then((contactItems) => res.json(contactItems));
});

app.post("/api/v1/contactItems", (req, res) => {
  const { newContactItem } = req.body;
  addContactItems(newContactItem)
    .then((data) => res.send(data))
    .then(console.log(contactItems));
});

app.get("/api/v1/contactItemsLastId", (req, res) => {
  getContactItemsLastId().then((lastId) => res.json(lastId));
});

app.delete("/api/v1/contactItems/:id", (req, res) => {
  //Delete function with query goes here !!
  const contactItemId = req.params.id;
  deleteContactItem(contactItemId).then((data) => res.send(data));
});

///Not Used Currently///


// const getUsers = () => {
//   const alarmsBuffer = {};
//   alarmItems.forEach((alarmItem) => (alarmsBuffer[alarmItem.user] = 0));

//   const users = Object.keys(alarmsBuffer);
//   return Promise.resolve(users);
// };

// // functions to handle axios posts coming from front end

// const addTime = (time) => {
//   alarmItems.push(time);

//   return Promise.resolve("ok"); // if this was DB call, return the created id
// };


// const addNewSound = (newSound) => {
//   soundItems.push(newSound);

//   return Promise.resolve("ok sound");
// };


// app.get("/api/v1/sounds", (req, res) => {
//   getSounds().then((Sounds) => res.json(Sounds));
// });

// app.get("/api/v1/users", (req, res) => {
//   getUsers().then((users) => res.json(users));
// });

// app.get("/api/v1/times", (req, res) => {
//   getTimes().then((times) => res.json(times));
// });

// app.post("/api/v1/times", (req, res) => {
//   const { time } = req.body;
//   addTime(time).then((data) => res.send(data));
// });
// const getTimes = () => {
//   const alarmsBuffer = {};
//   alarmItems.forEach((alarmItem) => (alarmsBuffer[alarmItem.time] = 0));

//   const times = Object.keys(alarmsBuffer);
//   return Promise.resolve(times);
// };

// const getContacts = () => {
//   const alarmsBuffer = {};
//   alarmItems.forEach((alarmItem) => (alarmsBuffer[alarmItem.contact] = 0));

//   const contacts = Object.keys(alarmsBuffer);
//   return Promise.resolve(contacts);
// };

// const getSounds = () => {
//   const alarmsBuffer = {};
//   alarmItems.forEach((alarmItem) => (alarmsBuffer[alarmItem.sound] = 0));

//   const sounds = Object.keys(alarmsBuffer);
//   return Promise.resolve(sounds);
// };

// const getUsers = () => {
//   const alarmsBuffer = {};
//   alarmItems.forEach((alarmItem) => (alarmsBuffer[alarmItem.user] = 0));

//   const users = Object.keys(alarmsBuffer);
//   return Promise.resolve(users);
// };

// const addTime = (time) => {
//   alarmItems.push(time);

//   return Promise.resolve("ok"); // if this was DB call, return the created id
// };

// // extra route needed for testing sound without breaking alarms
// app.get("/api/v2/sounds", (req, res) => {
//   getMockSounds().then((sounds) => res.json(sounds));
// });

// // extra route needed for testing sounds without breaking alarms
// app.post("/api/v2/sounds", (req, res) => {
//   const { newSound } = req.body;
//   console.log(req.body);
//   addNewSound(newSound).then((data) => res.send(data));
// });

module.exports = app;
