'use strict';

const express         = require('express');
const passport        = require('passport');
const router          = express.Router();

/* POST login.  */
router.post('/', passport.authenticate('local', { successRedirect: '/' }), (req, res) => {
  res.redirect('/');
});

/* GET home page. */
router.get('/', (req, res) => {
  // const user = req.session["passport"] ? req.session.passport.user : false;
  // if (req.session.passport != 'undefined') {
  //   console.log("test");
  // }
  if (!req.user)
    res.redirect('back');
  else
    res.render('index', { title: 'Playdate' });
});

module.exports = router;
