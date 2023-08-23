// the pages for the user go here

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// User model
const User = require('../models/User');
const { forwardAuthenticated } = require('../config/auth');

// Login page
router.get('/login', (request, response) => response.render('login'));

// Register page
router.get('/register', (request, response) => response.render('register'));

// Register Handle
router.post('/register', (request, response) => {
    const { name, email, password, password2} = request.body;
    let errors = [];

    // Check required fields
    if (!name || !email || !password || !password2) {
        errors.push({msg: "Please fill in all fields"});
    }

    // Check passwords match
    if (password !== password2) {
        errors.push({msg: "Passwords do not match"});
    }

    // Check password length
    if (password.length < 6) {
        errors.push({msg: "Password should be at least 6 characters"});
    }

    if (errors.length > 0) {
        response.render('register', { errors, name, email, password, password2});
    } else {
        // Validation passed
        User.findOne({email: email}).then(user => {
            if (user) {
                // User exists. Re-render the register form
                errors.push({msg: 'Email is already registered'});
                response.render('register', { errors, name, email, password, password2});
            } else {
                // else create a new user
                const newUser = new User({name, email, password}); // same thing as name: name, email: email ... but in ES6

                // we need to encrypt the password (we use bcrypt)
                bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    // set password to hashed
                    newUser.password = hash;
                    // save user
                    newUser.save().then(user => {
                        request.flash('success_msg', 'You are now registered and can log in');
                        response.redirect('/users/login');
                    });
                }));
                console.log(newUser);
            }
        });
    }
}); // route the post request to user/register. We don't need to put user/ because we are already in user/

// Login Handle. routes the login to use the session from the passport authentication
router.post('/login', (request, response, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: 'users/login',
        failureFlash: true
    })(request, response, next);
});

// Logout Handle
router.get('/logout', (request, response) => {
    request.logout();
    request.flash('success_msg', 'You are logged out');
    response.redirect('/users/login');
})

module.exports = router;