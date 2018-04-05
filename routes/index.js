'use strict';

const express         = require('express');
const passport        = require('passport');
const router          = express.Router();

/* POST login.  */
router.post('/', passport.authenticate('local', { successRedirect: '/' }));

/* GET home page. */
router.get('/', (req, res) => {
  var sessionHasUser = req.hasOwnProperty('user');
  if (!sessionHasUser)
    res.redirect('/authenticate');
  else
    res.render('index', { title: 'Playdate' });
});

module.exports = router;
