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
  .get(controllers.users.profile)

router.route('/repo/:name')
  .get(controllers.users.repo)

// GitHub OAuth route
router.route('/auth/github')
  .get(passport.authenticate('github'))

// Route after GitHub OAuth
router.route('/auth/github/callback')
  .get(passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect profile.
    res.redirect('/profile');
  });

// Route to de-auth user
app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/")
  })

module.exports = router;
