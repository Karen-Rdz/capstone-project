const express = require('express')

// const storeRoutes = require('./routes/Store.js')
// const products = require('./data/db.json')

const app = express()

app.use(express.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/', (req, res) => {
    res.status(200).send({"ping": "pong"})
  })

module.exports = app