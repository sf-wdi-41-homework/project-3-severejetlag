const db = require('../models');
const request = require('request');

// Loads profile page after login
let show = (req,res) => {
  // Get Requst using Users repo list url and access token
  db.User.findById(req.user._id, (err, user) => {
    if(err){
      console.log("Could not find user");
    }else{
      request.get({
        url: 'https://api.github.com/user/repos',
        headers:{'User-Agent': "Github Dashboard App",'Authorization': `token ${user.gitHub.accessToken}`}
      }, function(err, response, body) {
        // If successful then render profile page
        if (!err && response.statusCode == 200) {
          let repos = JSON.parse(body);
          user.save((err,saved) => {
            console.log('Updated ', user.gitHub.username);
            res.render(
              'profile.ejs',
              {
                message: req.flash('errorMessage'),
                user,
                repos,
                languageCounts: user.languageBreakdowns[user.languageBreakdowns.length -1].languageCounts,
                repoCount: repos.length
              }
            )
          })
        }
      })
    }
  })
}

let languages = (req,res) => {
  db.User.findById(req.user._id, (err, user) => {
    if(err){
      console.log("Couldn't find user")
    }else{
      res.json(user.languageBreakdowns)
    }
  })
}

let followers = (req,res) => {
  db.User.findById(req.user._id, (err,user) => {
    if(err){
      console.log("Couldn't find user")
    }else{
      res.json(user.followerCounts)
    }
  })
}

let following = (req,res) => {
  db.User.findById(req.user._id, (err,user) => {
    if(err){
      console.log("Couldn't find user")
    }else{
      res.json(user.followingCounts)
    }
  })
}

module.exports = {
  show,
  languages,
  followers,
  following
}
