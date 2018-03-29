const express = require('express');
const bodyParser = require('body-parser');
const UserModel = require('../repository/models/User');

const router = express.Router();
const jsonParser = bodyParser.json();

/* GET login page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'Playdate' });
});

router.post('/createUser', jsonParser, (req, res) => {
    UserModel.create({
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        },
        (err, user) => {
        if (err) return err;
        // Saved!

        res.send("inserted");   

    });
});

router.get('/getUsers', (req, res) => {
    const query = UserModel.find();
    UserModel.find().exec((err, users) => {
        var userMap = {};

        users.forEach(user => {
            userMap[user._id] = user;
        });

        res.send(userMap);        
    });
});

module.exports = router;
