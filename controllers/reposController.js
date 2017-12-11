const db = require('../models');
const request = require('request');

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
      request.get({
        url:repoInfo.languages_url,
        headers:{'User-Agent': "Github Dashboard App",'Authorization': `token ${req.user.gitHub.accessToken}`}
      }, function(err, response, body){
        if(!err && response.statusCode === 200){
          let repoLanguages = JSON.parse(body);
          request.get({
            url: `${repo}/stats/contributors`,
            headers:{'User-Agent': "Github Dashboard App",'Authorization': `token ${req.user.gitHub.accessToken}`}
          },function(err,response,body){
            if(!err && response.statusCode === 200){
              let repoContributors = JSON.parse(body)
              console.log(repoContributors)
              res.render(
                'repo.ejs',
                {
                  message: req.flash('errorMessage'),
                  user:req.user,
                  repoInfo,
                  repoLanguages
                }
              )
            }
          })
        }
      })
    }
  })
}

module.exports = {
  show
}
