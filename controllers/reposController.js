const db = require('../models');
const request = require('request');

let show = (req,res) => {
  repo = req.params.name
  request.get({
    url: `https://api.github.com/repos/${req.user.gitHub.username}/${repo}`,
    headers:{'User-Agent': "Github Dashboard App",'Authorization': `token ${req.user.gitHub.accessToken}`}
    }, function(err, response, body) {
    // If successful then render profile page
    if (!err && response.statusCode == 200) {
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
  show
}
