const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const sendTwilio = require("./twilio/send_sms")
const alarmItems = require("./data/mockAlarmItemData");

//Multer middleware for file uploading
const multer = require("multer");




const app = express();

// Multer storage
const DIR = "./data/soundData" // Sound data file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    console.log("file: ", file);
    cb(null, Date.now() + path.extname(file.originalname));
  }
})

const upload = multer({storage: storage});


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

// DB Query test router
const usersRouter = require('./routes/users');
// DB query test app.use
app.use('/users', usersRouter);

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
app.post("/upload", upload.single("sound"), (req, res) => {
  res.send("Sound uploaded!");
});



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
  console.log(req.body.contactName)
  // sendTwilio(req.body.phoneNumber)
})







///Returns full item for each alarm

const getAlarmItems = (email) => {
 // const alarmItemsBuffer = [];

  // alarmItems.forEach((alarmItem)=> {
  //   if(alarmItem.user_id == email){
  //     alarmItemsBuffer.push(alarmItem)
  //   }

  // })  

  // console.log(alarmItemsBuffer)


  const sortedByUser = alarmItems.filter(function(el) {
    return el.user_email == email
  })

  return Promise.resolve(sortedByUser);
};




//gets specific information from alarmItems below

const getUsers = () => {
  const alarmsBuffer = {};
  alarmItems.forEach((alarmItem) => (alarmsBuffer[alarmItem.user] = 0));

  const users = Object.keys(alarmsBuffer);
  return Promise.resolve(users);
};



app.get("/api/v1/alarmItems/:id", (req, res) => {
  getAlarmItems(req.params.id).then((alarmItems) => res.json(alarmItems));
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


