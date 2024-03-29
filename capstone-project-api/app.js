const express = require('express')

const plannerRoutes = require('./routes-planner')

const app = express()

app.use(express.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.post('/user', plannerRoutes)
app.post('/login', plannerRoutes)
app.post('/trip', plannerRoutes)
app.get('/trips', plannerRoutes)
app.post('/session', plannerRoutes)
app.get('/sessions', plannerRoutes)

app.get('/', (req, res) => {
    res.status(200).send({"ping": "pong"})
  })

module.exports = app