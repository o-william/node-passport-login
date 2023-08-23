// hompages go here. e.g, '/', '/index', '/dashboard'

const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
// const { request } = require('express');

// Welcome Page
router.get('/', forwardAuthenticated, (request, response) => response.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (request, response) => response.render('dashboard'), {user: request.user});

module.exports = router;