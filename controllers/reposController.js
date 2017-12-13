const db = require('../models');
const request = require('request');

// Grab parameter from URL to do API call to GitHub to pull repo information
let show = (req,res) => {
  repo = `https://api.github.com/repos/${req.user.gitHub.username}/${req.params.name}`
  request.get({
    url: repo,
    headers:{'User-Agent': "Github Dashboard App",'Authorization': `token ${req.user.gitHub.accessToken}`}
    }, function(err, response, body) {
    // If successful then render profile page
    if (!err && response.statusCode == 200) {
      let repoInfo = JSON.parse(body);
      console.log(repoInfo)
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

// Custom API call to deliver language breakdown for Repo to server to Ajax call
let languages = (req,res) => {
  repo = `https://api.github.com/repos/${req.user.gitHub.username}/${req.params.name}/languages`
  request.get({
    url:repo,
    headers:{'User-Agent': "Github Dashboard App",'Authorization': `token ${req.user.gitHub.accessToken}`}
  }, function(err, response, body){
    if(!err && response.statusCode === 200){
      let repoLanguages = JSON.parse(body);
      res.json(repoLanguages)
    }
  })
}

module.exports = {
  show,
  languages
}
