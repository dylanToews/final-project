const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sounds = require("./data/soundData")

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


const getSounds = () => {
  return new Promise.resolve(sounds);
};

const getCategories = () => {

};

app.get("/api/v1/sounds", (req,res) => {
  getSounds().then((sounds) => res.json(sounds));
});
app.get("/api/v1/categories", (req,res) => {
  getCategories().then((categories) => res.json(categories));
});

app.post("/api/v1/sounds", (req,res) => {

});
app.post("/api/v1/categories", (req,res) => {

});

module.exports = app;
