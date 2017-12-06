const db = require('../models');

// Handle static page routes
let home = (req, res) => {
  res.render('index.ejs',{message: req.flash('errorMessage'), user:req.user})
}

module.exports = {
  home
}
