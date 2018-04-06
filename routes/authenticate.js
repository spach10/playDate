'use strict';

const express       = require('express');
const bodyParser    = require('body-parser');
const passwordHash  = require('password-hash');
const passport      = require('passport');

const db            = require('../database')('playDate');
const Users         = require('../controllers/Users')(db);

const router        = express.Router();

/* GET login page. */
router.get('/', (req, res) => {
    res.render('authenticate/login', { title: 'Playdate' });
});

/* GET logout */
router.get('/logout', (req, res) => {
    if (req.user) req.logout();
    res.redirect('/authenticate');
});

/* GET create user page. */
router.get('/createUser', (req, res) => {
    res.render('authenticate/create', {title: 'Create User'})
});

/* POST new user. */
router.post('/createUser', async (req, res) => {
    const body = req.body;
    if (!body || !body.username || !body.password || !body.firstname || !body.lastname) {
        res.status(400).send('Invalid body');
    } else {
        const created = await Users.create(body.username, body.password, body.firstname, body.lastname);
        if (created) {
            res.redirect('/authenticate');
        } else {
            res.status(500).send("I don't know what happened but it didn't create the user");
        }
    }
});

router.get('/getUsers', async (req, res) => {
    res.send(await Users.getUsers());
});

module.exports = router;
