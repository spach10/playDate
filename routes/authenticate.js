
const express       = require('express');
const bodyParser    = require('body-parser');
const passwordHash  = require('password-hash');
const passport      = require('passport');

const db            = require('../database')('users');
const Users         = require('../controllers/Users')(db);

const router        = express.Router();
const jsonParser    = bodyParser.json();

/* GET login page. */
router.get('/', (req, res, next) => {
    res.render('authenticate/login', { title: 'Playdate' });
});

/* GET logout */
router.get('/logout', (req, res) => {
    if (req.user) req.logout();
    res.redirect('/authenticate');
});

/* GET create user page. */
router.get('/createUser', (req, res, next) => {
    res.render('authenticate/create', {title: 'Create User'})
});

/* POST login.  */
router.post('/', passport.authenticate('local'), (req, res) => {
    res.redirect('/');
});

/* POST new user. */
router.post('/createUser', jsonParser, async (req, res) => {
    const body = req.body;
    if (!body || !body.username || !body.password || !body.firstname || !body.lastname) {
        res.status(400).send('Invalid body');
    } else {
        const created = await Users.create(body.username, body.password, body.firstname, body.lastname);
        if (created) {
            res.redirect('/authenticate');
            res.status(200).send('User created');
        } else {
            res.status(500).send("I don't know what happened but it didn't create the user");
        }
    }
});

router.get('/getUsers', (req, res) => {
    
});

// router.get('/deleteAllUsers', (req, res) => {
//     
// });

module.exports = router;
