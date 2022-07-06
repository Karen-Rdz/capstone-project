const express = require('express');
const Planner = require('./models-planner');

const router = express.Router()

router.post('/user', function (req, res) {
    const user = req.body.user;
    const newUser = Planner.createUser(user);
    res.send(newUser)
})

router.get('/users', function (req, res) {
    const users = Planner.getUsers()
    res.send({users});
})

module.exports = router