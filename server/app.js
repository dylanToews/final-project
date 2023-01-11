const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const multer = require("multer"); //Multer middleware for file uploading
const cors = require("cors");
const fs = require("fs");
const sendTwilio = require("./twilio/send_sms")
const alarmItems = require("./data/mockAlarmItemData");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

// Multer storage
const DIR = "./public/audio" // Sound data file storage - must be in public for current acceess methods
const audioStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    console.log("file before rename: ", file);
    cb(null, Date.now() + path.extname(file.originalname));
  }
})

const uploadAudio = multer({storage: audioStorage});



// DB Query test router
const usersRouter = require('./routes/users');
const contactsRouter = require("./routes/contacts");
// DB query test app.use
app.use('/users', usersRouter);
app.use("/contacts", contactsRouter);

// first attempt at login routes
app.use("/login", (req, res) => {
  res.send({
    token: "test123"
  });
});


// eventually write db queries in functions below, i think?

// const getSomeDataExample = () => {
//   return db.query("SELECT * FROM data")
// }

// Multer upload test
app.post("/upload", uploadAudio.single("sound"), (req, res) => {
  res.send(req.file.filename);
  console.log(req.file.filename);

  fs.readdir(DIR, (err, files) => {
    files.forEach(file => {
      console.log("files: ", file);
    })
  })
});

///Returns full item for each alarm

const getAlarmItems = () => {
  return Promise.resolve(alarmItems);
};

//gets specific information from alarmItems below

const getUsers = () => {
  const alarmsBuffer = {};
  alarmItems.forEach((alarmItem) => (alarmsBuffer[alarmItem.user] = 0));

  const users = Object.keys(alarmsBuffer);
  return Promise.resolve(users);
};

const getTimes = () => {
  const alarmsBuffer = {};
  alarmItems.forEach((alarmItem) => (alarmsBuffer[alarmItem.time] = 0));

  const times = Object.keys(alarmsBuffer);
  return Promise.resolve(times);
};

const getContacts = () => {
  const alarmsBuffer = {};
  alarmItems.forEach((alarmItem) => (alarmsBuffer[alarmItem.contact] = 0));

  const contacts = Object.keys(alarmsBuffer);
  return Promise.resolve(contacts);
};

const getSounds = () => {
  const alarmsBuffer = {};
  alarmItems.forEach((alarmItem) => (alarmsBuffer[alarmItem.sound] = 0));

  const sounds = Object.keys(alarmsBuffer);
  return Promise.resolve(sounds);
};

// functions to handle axios posts coming from front end


const addTime = (time) => {
  alarmItems.push(time);

  return Promise.resolve("ok"); // if this was DB call, return the created id
};

const addAlarmItem = (newAlarmItem) => {
  alarmItems.push(newAlarmItem);

  return Promise.resolve("ok"); // if this was DB call, return the created id
};

app.post("/api/v1/sendSMS", (req, res) => {
  console.log(req.body.phoneNumber)
  // sendTwilio(req.body.phoneNumber)
})

app.get("/api/v1/alarmItems", (req, res) => {
  getAlarmItems().then((alarmItems) => res.json(alarmItems));
});

app.get("/api/v1/users", (req, res) => {
  getUsers().then((users) => res.json(users));
});

app.get("/api/v1/times", (req, res) => {
  getTimes().then((times) => res.json(times));
});

app.get("/api/v1/contacts", (req, res) => {
  getContacts().then((contacts) => res.json(contacts));
});

app.get("/api/v1/sounds", (req, res) => {
  getSounds().then((Sounds) => res.json(Sounds));
});






app.post("/api/v1/alarmItems", (req, res) => {
  const { newAlarmItem } = req.body;
  addAlarmItem(newAlarmItem).then((data) => res.send(data));
});

app.post("/api/v1/times", (req, res) => {
  const { time } = req.body;
  addTime(time).then((data) => res.send(data));
});
module.exports = app;


