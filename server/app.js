const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const sendTwilio = require("./twilio/send_sms");


///Mock Data///

const alarmItems = require("./data/mockAlarmItemData");
const contactItems = require("./data/mockContactsData");

//Multer middleware for file uploading
const multer = require("multer");

const app = express();

// Multer storage
const DIR = "./data/soundData"; // Sound data file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    console.log("file: ", file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

// DB Query test router
const usersRouter = require("./routes/users");
const contactsRouter = require("./routes/contacts");
// DB query test app.use
app.use("/users", usersRouter);
app.use("/contacts", contactsRouter);

// first attempt at login routes
app.use("/login", (req, res) => {
  res.send({
    token: "test123",
  });
});

// eventually write db queries in functions below, i think?

// const getSomeDataExample = () => {
//   return db.query("SELECT * FROM data")
// }

// Multer upload test
app.post("/upload", upload.single("sound"), (req, res) => {
  res.send("Sound uploaded!");
});



/// Twilio Related ///

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

///ALARM ITEMS - Gets/Posts

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

/// CONTACTS - FUNCTIONS ////////

const getContactItems = (user_email) => {
  const sortedByUser = contactItems.filter(function (el) {
    return el.user_email == user_email;
  });

  return Promise.resolve(sortedByUser);
};

///CONTACTS - Gets/Posts ///

app.get("/api/v1/contactItems/:id", (req, res) => {
  getContactItems(req.params.id).then((contactItems) => res.json(contactItems));
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
