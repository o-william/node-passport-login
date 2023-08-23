# Web Login App - Node.js & Passport

This is a web appplication which facilitates user registration and login. It uses Node.js, Express, Passport, Mongoose, EJS, BCrypt and some other packages.

### Usage

```sh
$ npm install
```

```sh
$ npm start
# Or run with Nodemon
$ npm run dev

# Visit http://localhost:5050
```

### MongoDB

Create "config/keys.js" and add your MongoDB URI, local or Atlas. For mongodb, use: 
module.exports = {
    mongoURI: <your mongo key here, wrapped with single or double quotes>
};


This app has a lot of bugs, so there are issues I am still working on. Thank you.