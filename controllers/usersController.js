const db = require('../models');
const request = require('request');

let profile = (req,res) => {
  request.get({
    url: req.user.gitHub.reposUrl,
    headers:{
      'User-Agent': "Github Dashboard App",
      'Authorization': `token ${req.user.gitHub.accessToken}`
    }
    }, function(err, response, body) {
    if (!err && response.statusCode == 200) {
      var repos = JSON.parse(body);
      res.render(
        'index.ejs',
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
  // })
}

module.exports = {
  profile
}
