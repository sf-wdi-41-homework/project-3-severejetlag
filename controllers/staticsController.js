const db = require('../models');

// Handle static page routes
let home = (req, res) => {
  res.render('index.ejs',{message: req.flash('errorMessage')})
}

module.exports = {
  	home
}
