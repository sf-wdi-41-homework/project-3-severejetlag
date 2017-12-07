const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
const passport = require("passport");
require("./passport")(passport)
// Hoem page route
router.route('/')
  .get(controllers.statics.home);

router.route('/profile')
  .get(controllers.statics.profile)

router.route('/auth/github')
  .get(passport.authenticate('github'))

router.route('/auth/github/callback')
  .get(passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/")
  })

module.exports = router;
