// To ensure that a user is actually logged in before the /logout page can be accessed
// we can also add this to any route that we need to be protected.

module.exports = {
    ensureAuthenticated: function(request, response, next) {
        if(request.isAuthenticated()) {
            return next();
        }
        request.flash('error_msg', 'Please log in to view this resource');
        response.redirect('/users/login');
    },
    forwardAuthenticated: function(request, response, next) {
        if (!request.isAuthenticated()) {
          return next();
        }
        response.redirect('/dashboard');      
    }
}