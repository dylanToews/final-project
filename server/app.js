const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const alarmItems = require("./data/mockAlarmItemData");

console.log(alarmItems)

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// eventually write db queries in functions below, i think?

// const getSomeDataExample = () => {
//   return db.query("SELECT * FROM data")
// }



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


app.get("/api/v1/alarmItems", (req, res) => {
  getAlarmItems().then((alarmItems) => res.json(alarmItems))
});

app.get("/api/v1/users", (req, res) => {
  getUsers().then((users) => res.json(users))
});

app.get("/api/v1/times", (req, res) => {
  getTimes().then((times) => res.json(times))
});

app.get("/api/v1/contacts", (req, res) => {
  getContacts().then((contacts) => res.json(contacts))
});

app.get("/api/v1/sounds", (req, res) => {
  getSounds().then((Sounds) => res.json(Sounds))
});






app.post("/api/v1/alarmItem", (req, res) => {
  //...
  app.post("/api/v1/alarm", (req, res) => {
    //...
  });
});

module.exports = app;
