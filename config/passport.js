const db = require('../models');
const GitHubStrategy = require('passport-github').Strategy;

module.exports = function(passport){
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    db.User.findById(id, function(err, user) {
      console.log('deserializing user:',user);
      done(err, user);
    });
  });

  passport.use('github', new GitHubStrategy({
    clientID        : process.env.GITHUB_CLIENT_ID,
    clientSecret    : process.env.GITHUB_CLIENT_SECRET,
    callbackURL     : process.env.HEROKU_CALLBACK_DOMAIN || 'http://localhost:3000/auth/github/callback'
  }, function(accessToken, refreshToken, profile, cb) {
    // // Use this to see the information returned from Facebook
    process.nextTick(function() {
      db.User.findOne({ 'gitHub.id' : profile.id }, function(err, user) {
        if (err) return cb(err);
        if (user) {
          return cb(null, user);
        } else {

          let newUser = new db.User();
          newUser.gitHub.id                 = profile.id;
          newUser.gitHub.accessToken        = accessToken;
          newUser.gitHub.username           = profile.username;
          newUser.gitHub.email              = profile._json.email;
          newUser.gitHub.name               = profile._json.name;
          newUser.gitHub.avatarUrl          = profile._json.avatar_url;
          newUser.gitHub.location           = profile._json.location;
          newUser.gitHub.apiUrl             = profile._json.url;
          newUser.gitHub.profileUrl         = profile._json.html_url;
          newUser.gitHub.followersUrl       = profile._json.followers_url;
          newUser.gitHub.reposUrl           = profile._json.repos_url;
          newUser.gitHub.publicRepos        = profile._json.public_repos;
          newUser.gitHub.publicGists        = profile._json.public_gists;
          newUser.gitHub.hireable           = profile._json.hireable;
          newUser.gitHub.followers          = profile._json.followers;
          newUser.gitHub.following          = profile._json.following;
          newUser.gitHub.createdAt          = profile._json.created_at;
          newUser.gitHub.updatedAt          = profile._json.updated_at;

          newUser.save(function(err) {
            if (err)
              throw err;

            return cb(null, newUser);
          });
        }

      });
    });
  }));

}
