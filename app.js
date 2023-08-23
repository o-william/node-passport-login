const express = require('express');
const expressLayouts = require('express-ejs-layouts'); //
const mongoose = require('mongoose');
const flash = require('connect-flash'); // for flash messages
const session = require('express-session'); // the flash messages are stored in a session
const passport = require('passport');

const app = express();

// Passport config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true}) // returns a promise.
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// EJS as middleware
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Bodyparser: middleware needed because we are rrfilling out a registration
app.use(express.urlencoded({ extended: true}));

//Express session
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));

// Passport middleware. important to be after the express session
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables - for the colors of the flash messages
app.use((request, response, next) => {
  response.locals.success_msg = request.flash('success_msg');
  response.locals.error_msg = request.flash('error_msg');
  response.locals.error = request.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));

const PORT = process.env.PORT || 5050;

app.listen(PORT, console.log(`Server started on port ${PORT}`));