const db = require('../models');
const request = require('request');

// Loads profile page after login
let show = (req,res) => {
  // Get Requst using Users repo list url and access token
  request.get({
    url: 'https://api.github.com/user/repos',
    headers:{'User-Agent': "Github Dashboard App",'Authorization': `token ${req.user.gitHub.accessToken}`}
    }, function(err, response, body) {
    // If successful then render profile page
    if (!err && response.statusCode == 200) {
      let repos = JSON.parse(body);
      res.render(
        'profile.ejs',
        {
          message: req.flash('errorMessage'),
          user:req.user,
          repos,
          languageCount: languageCalculater(repos)
        }
      )
    }
  })
}

// Count totals of each language for all repos 
let languageCalculater = (repos) => {
  let languageCount = {}
  repos.forEach(function(repo,i){
    if(!Object.keys(languageCount).includes(String(repo.language))){
      languageCount[String(repo.language)] = 1;
    }else{
      languageCount[String(repo.language)]++;
    }
  })
  return languageCount
}

module.exports = {
  show
}
