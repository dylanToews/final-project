const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

///Mock Data///

const contactItems = require("./data/mockContactsData");

//Multer middleware for file uploading
const multer = require("multer");
const fs = require("fs");
const sendTwilio = require("./twilio/send_sms");
const alarmItems = require("./data/mockAlarmItemData");
const soundsData = require("./data/mockSoundData");

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

/// Twilio Related ///

const getUsers = () => {
  const alarmsBuffer = {};
  alarmItems.forEach((alarmItem) => (alarmsBuffer[alarmItem.user] = 0));

  const users = Object.keys(alarmsBuffer);
  return Promise.resolve(users);
};

const getMockSounds = () => {
  return Promise.resolve(soundsData);
};

// functions to handle axios posts coming from front end

const addTime = (time) => {
  alarmItems.push(time);

  return Promise.resolve("ok"); // if this was DB call, return the created id
};

const addNewSound = (newSound) => {
  soundsData.push(newSound);

  return Promise.resolve("ok sound");
};

app.post("/api/v1/sendSMS", (req, res) => {
  console.log(req.body.contactName);
  // sendTwilio(req.body.phoneNumber)
});

///ALARM ITEMS  - Functions///

const getAlarmItems = (user_email) => {
  const sortedByUser = alarmItems.filter(function (el) {
    return el.user_email == user_email;
  });

  return Promise.resolve(sortedByUser);
};

const getAlarmItemsLastId = () => {
  const lastId = alarmItems.length;

  return Promise.resolve(lastId);
};
const addAlarmItem = (newAlarmItem) => {
  alarmItems.push(newAlarmItem);

  return Promise.resolve("ok"); // if this was DB call, return the created id
};

///ALARM ITEMS - Routes

app.get("/api/v1/alarmItems/:id", (req, res) => {
  getAlarmItems(req.params.id).then((alarmItems) => res.json(alarmItems));
});

app.get("/api/v1/alarmItemLastId", (req, res) =>
  getAlarmItemsLastId().then((lastId) => res.json(lastId))
);

app.post("/api/v1/alarmItems", (req, res) => {
  const { newAlarmItem } = req.body;
  addAlarmItem(newAlarmItem).then((data) => res.send(data));
});

// SOUND -  Routes //

// extra route needed for testing sound without breaking alarms
app.get("/api/v2/sounds", (req, res) => {
  getMockSounds().then((sounds) => res.json(sounds));
});

// extra route needed for testing sounds without breaking alarms
app.post("/api/v2/sounds", (req, res) => {
  const { newSound } = req.body;
  console.log(req.body);
  addNewSound(newSound).then((data) => res.send(data));
});

/// CONTACTS - FUNCTIONS ////////

const getContactItems = (user_email) => {
  const sortedByUser = contactItems.filter(function (el) {
    return el.user_email == user_email;
  });

  return Promise.resolve(sortedByUser);
};

const addContactItems = (newContactItem) => {
  contactItems.push(newContactItem);

  return Promise.resolve("ok"); // if this was DB call, return the created id
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

app.get("/api/v1/contactItems/:id", (req, res) => {
  getContactItems(req.params.id).then((contactItems) => res.json(contactItems));
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

module.exports = app;
