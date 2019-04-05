const express = require('express');
const passport = require('passport');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../configs/general')
const { generateErrorJSON } = require('../shared/common')


router.get('/', (req, res) => {
  res.send('Authentication Route root.');
});

router.post('/signup', (req, res, next) => {

  return passport.authenticate('local-signup', (err, passportUser, info) => {
    if (err) {
      return res.status(400).json(generateErrorJSON(err.message, err));
    }

    if (passportUser) {
      const user = { email: passportUser.email, id: passportUser.id, name: passportUser.name };
      return res.json({ user: user });
    }

    return res.status(400).json(generateErrorJSON(info));
  })(req, res, next);
});

router.post('/login', (req, res, next) => {

  return passport.authenticate('local-login', (err, passportUser, info) => {
    if (err) {
      return res.status(400).json(generateErrorJSON(err.message, err));
    }

    if (passportUser) {
      const user = { email: passportUser.email, id: passportUser.id, name: passportUser.name };
      user.token = jwt.sign({ email: passportUser.email, id: passportUser.id }, jwtSecret);
      return res.json({ user: user });
    }

    return res.status(400).json(generateErrorJSON(info));
  })(req, res, next);
});

module.exports = router;