const db = require('../models');
const request = require('request');

let loginUpdate = (req,res) => {
  db.User.findById(req.user._id, (err,user) => {
    if(err) {
      console.log(`Couldn't find user`);
    } else {
      request.get({
        url: 'https://api.github.com/user',
        headers:{'User-Agent': "Github Dashboard App",'Authorization': `token ${user.gitHub.accessToken}`}
      }, (err, response, body) => {
        // If successful then render profile page
        if (!err && response.statusCode == 200) {
          let profile = JSON.parse(body);
          console.log(profile)
          if(user.updatedAt !== profile.updated_at){
            user.updatedAt = profile.updated_at
          }
          if(user.location !== profile.location){
            user.location = profile.location
          }
          if(user.publicRepos !== profile.public_repos){
            user.publicRepos = profile.public_repos
          }
          if(user.publicGists !== profile.public_gists){
            user.publicGists = profile.public_gists
          }
          if(user.hireable !== profile.hireable){
            user.hireable = profile.hireable
          }
          if(user.avatarUrl !== profile.avatar_url){
            user.avatarUrl = profile.avatar_url
          }
          if(user.updatedAt !== profile.updated_at){
            user.updatedAt = profile.updated_at
          }
          if(user.updatedAt !== profile.updated_at){
            user.updatedAt = profile.updated_at
          }
          user.followerCounts.push({followerCount: profile.followers})
          user.followingCounts.push({followingCount: profile.following})
          user.save((err, saved) => {
            console.log('Updated ', user.gitHub.username);
            res.redirect('/profile');
          });
        }
      })
    }
  })
}

let logout = (req,res) => {
  req.session.destroy( err => {
    if(err){
      console.log(err)
      return
    }else{
      res.redirect('/'); //
    }
  });
}

module.exports = {
  loginUpdate,
  logout
}
