const express = require('express');
const flash = require('connect-flash');
const ejsLayouts = require("express-ejs-layouts");
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const request = require('request');

// Require controllers and models
const db = require('./models');
const controllers = require('./controllers');

// Initialise Express App
app = express();

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(ejsLayouts);
app.use(session({ secret: 'WDI-GENERAL-ASSEMBLY-EXPRESS' }));
app.use(flash());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');
app.set("views", __dirname + "/views");

const routes = require("./config/routes");
app.use(routes);
app.listen(process.env.PORT || 3000,  () => {
  	console.log('Express server is up and running on http://localhost:3000/');
});
