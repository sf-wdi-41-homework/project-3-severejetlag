const db = require('../models');
const request = require('request');

// Update user profile information on login
let loginUpdate = (req,res) => {
  db.User.findById(req.user._id, (err,user) => {
    if(err) {
      console.log(`Couldn't find user`);
    } else {

      // GitHub API request to check current stats
      request.get({
        url: 'https://api.github.com/user',
        headers:{'User-Agent': "Github Dashboard App",'Authorization': `token ${user.gitHub.accessToken}`}
      }, (err, response, body) => {
        // If successful then render profile page
        if (!err && response.statusCode === 200) {
          let profile = JSON.parse(body);
          console.log(profile)
          user.updatedAt = profile.updated_at
          user.location = profile.location
          user.publicRepos = profile.public_repos
          user.publicGists = profile.public_gists
          user.hireable = profile.hireable
          user.avatarUrl = profile.avatar_url
          user.updatedAt = profile.updated_at
          user.updatedAt = profile.updated_at
          // Create history of followers and following
          user.followerCounts.push({followerCount: profile.followers})
          user.followingCounts.push({followingCount: profile.following})
          // Grab repo iinformation to calculate language breakdown
          request.get({
            url:'https://api.github.com/user/repos',
            headers:{'User-Agent': "Github Dashboard App",'Authorization': `token ${user.gitHub.accessToken}`}
          }, (err,response,body) => {
            if(!err && response.statusCode === 200){
              let repos = JSON.parse(body);
              let languageCounts = languageCalculater(repos);
              user.languageBreakdowns.push({languageCounts, repoTotal: repos.length})
              user.save((err, saved) => {
                console.log('Updated ', user.gitHub.username);
                res.redirect('/profile');
              });

            }
          })
        }
      })
    }
  })
}

// Destory user session
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

// Method to sort and categorize language breakdown
let languageCalculater = (repos) => {
  let languageCounts = {}
  repos.forEach(function(repo,i){
    let key = String(repo.language)
    if(key === "null"){
      key = "Mixed"
    }
    if(!Object.keys(languageCounts).includes(key)){
      languageCounts[key] = 1;
    }else{
      languageCounts[key]++;
    }
  })
  return languageCounts
}

module.exports = {
  loginUpdate,
  logout
}
