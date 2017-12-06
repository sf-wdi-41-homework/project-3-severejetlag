const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
const passport = require("passport");
require("./passport")(passport)
// Hoem page route
router.route('/')
  .get(controllers.statics.home);

router.route('/auth/github')
  .get(passport.authenticate('github'))

module.exports = router;
