const db = require('../models');
const request = require('request');

// Loads profile page after login
let profile = (req,res) => {
  // Get Requst using Users repo list url and access token
  request.get({
    url: 'https://api.github.com/user/repos',
    headers:{
      'User-Agent': "Github Dashboard App",
      'Authorization': `token ${req.user.gitHub.accessToken}`
    }
    }, function(err, response, body) {
    // If successful then render profile page
    if (!err && response.statusCode == 200) {
      console.log(JSON.parse(body))
      var repos = JSON.parse(body);
      res.render(
        'profile.ejs',
        {
          message: req.flash('errorMessage'),
          user:req.user,
          repos
        }
      )
    }
  })
  // request.get('https://api.github.com/rate_limit', {headers:{'User-Agent': "Github Dashboard App",'Authorization': `token ${req.user.gitHub.accessToken}`}}, function(err, response, body) {
  //   console.log(JSON.parse(body))
  //   res.send('ok')
  // })
}

let repo = (req,res) => {
  repo = req.params.name
  request.get({
    url: `https://api.github.com/repos/${req.user.gitHub.username}/${repo}`,
    headers:{
      'User-Agent': "Github Dashboard App",
      'Authorization': `token ${req.user.gitHub.accessToken}`
    }
    }, function(err, response, body) {
    // If successful then render profile page
    if (!err && response.statusCode == 200) {
      console.log(JSON.parse(body))
      let repoInfo = JSON.parse(body);
      res.render(
        'repo.ejs',
        {
          message: req.flash('errorMessage'),
          user:req.user,
          repoInfo
        }
      )
    }
  })
}

module.exports = {
  profile,
  repo
}
