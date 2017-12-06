// require mongoose and connect to database
const mongoose = require('mongoose');
mongoose.connect( process.env.MONGODB_URI || 'mongodb://localhost/gh_dashboard');

module.exports = {
  	User: require('./user'),
};
