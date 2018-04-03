'use strict';

const express         = require('express');
const passport        = require('passport');
const router          = express.Router();

/* POST login.  */
router.post('/', passport.authenticate('local', { failureRedirect: '/authenticate' }), (req, res) => {
  res.redirect('/');
});

/* GET home page. */
router.get('/', passport.authenticate('local', { failureRedirect: '/authenticate' }), (req, res) => {
  res.render('index', { title: 'Playdate' });
});

module.exports = router;
