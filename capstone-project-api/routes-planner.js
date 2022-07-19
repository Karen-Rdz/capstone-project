const express = require('express');
const Planner = require('./models-planner');
const Parse = require('parse/node')

const PARSE_APP_ID = "vCm2pVYqihU8yUmABs5jPLv5Qy2EpIILYZUJkz16"
const PARSE_JAVASCRIPT_KEY = "aWI4yUa11fafzJy8AIUk3Ld8KhLOeCenl9rvsRop"
Parse.initialize(PARSE_APP_ID, PARSE_JAVASCRIPT_KEY)
Parse.serverURL = "https://parseapi.back4app.com"

const router = express.Router()

router.post('/user', async function (req, res) {
        let user = new Parse.User(req.body.user);
        try {
            await user.signUp();
            res.status(201);
            res.send({ "user": user });
        } catch (error) {
            res.status(200);
            res.send("error");
        }
    })

router.post('/login', async function (req, res) {
    try {
        const user = await Parse.User.logIn(req.body.user.username, req.body.user.password)
        res.send({"user" : user})
      } catch (error) {
        res.status(400)
        res.send({"error" : "Login failed: " + error })
      }
})

router.post('/trip', async function (req, res) {
    try {
        const trip = new Parse.Object("Trips", req.body)
        await trip.save();
        res.status(201);
        res.send({ "trip": trip });
      } catch (error) {
        res.status(400)
        res.send({"error" : error })
      }
})

router.get('/trips', async (req, res) => {
  try {
    const query = new Parse.Query("Trips")
    query.descending("createdAt")
    trips = await query.find()
    res.send({"trips" : trips})
  } catch (error) {
    res.status(400)
    res.send({"error" : "Trips query failed: " + error })
  }
})

router.post('/session', async function (req, res) {
  try {
      const session = new Parse.Object("Sessions", req.body)
      await session.save();
      res.status(201);
      res.send({ "session": session });
    } catch (error) {
      res.status(400)
      res.send({"error" : error })
    }
})

router.get('/sessions', async (req, res) => {
  try {
    const query = new Parse.Query("Sessions")
    query.descending("createdAt")
    query.include("user")
    sessions = await query.find()
    res.send({"sessions" : sessions})
  } catch (error) {
    res.status(400)
    res.send({"error" : "Sessions query failed: " + error })
  }
})

module.exports = router