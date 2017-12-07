const db = require('../models');
const request = require('request');

// Handle static page routes
let home = (req, res) => {
  res.render('index.ejs',{message: req.flash('errorMessage'), user:req.user})
}

let profile = (req,res) => {

  console.log(req.user.gitHub.reposUrl);
  // request.get({
  //   url: req.user.gitHub.reposUrl,
  //   headers:{
  //     'User-Agent': "Github Dashboard App",
  //     'Authorization': `token ${req.user.gitHub.accessToken}`
  //   }
  //   }, function(err, response, body) {
  //   if (!err && response.statusCode == 200) {
  //     var repos = JSON.parse(body);
  //     console.log(repos)
  //     res.render('index.ejs',{message: req.flash('errorMessage'), user:req.user})
  //   }else{
  //     console.log(err)
  //     console.log(response)
  //     console.log(body)
  //   }
  // })
  request.get('https://api.github.com/rate_limit', {headers:{'User-Agent': "Github Dashboard App",'Authorization': `token ${req.user.gitHub.accessToken}`}}, function(err, response, body) {
    console.log(JSON.parse(body))
  })
  res.send("ok!")
}

module.exports = {
  home,
  profile
}
