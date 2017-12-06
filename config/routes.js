const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
const passport = require("passport");

// Hoem page route
router.route('/')
  	.get(controllers.statics.home);

module.exports = router;
