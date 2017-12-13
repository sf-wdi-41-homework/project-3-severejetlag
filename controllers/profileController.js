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
          let languageCounts = languageCalculater(repos);
          user.languageBreakdowns.push({languageCounts})
          user.save((err,saved) => {
            console.log('Updated ', user.gitHub.username);
            res.render(
              'profile.ejs',
              {
                message: req.flash('errorMessage'),
                user,
                repos,
                languageCounts,
                repoCount: repos.length
              }
            )
          })
        }
      })
    }
  })
}

// Count totals of each language for all repos
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
  show
}
