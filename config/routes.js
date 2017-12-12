const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
const passport = require("passport");
require("./passport")(passport)

// Hoem page route
router.route('/')
  .get(controllers.statics.home);

// Route post login
router.route('/profile')
  .get(controllers.profile.show)

router.route('/repo/:name')
  .get(controllers.repos.show)

router.route('/api/repo/:name/languages')
  .get(controllers.repos.languages)

// GitHub OAuth route
router.route('/auth/github')
  .get(passport.authenticate('github',{ scope: [ 'user:email' ] }))

// Route after GitHub OAuth
router.route('/auth/github/callback')
  .get(passport.authenticate('github', { failureRedirect: '/' }),controllers.auth.loginUpdate);

// Route to de-auth user
router.route("/logout")
  .get(controllers.auth.logout)

module.exports = router;
