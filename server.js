'use strict';

const express = require('express');
const morgan = require('morgan');


const { handleHomepage, handleProfilePage, handleLogin, handleLogout,
        handleName, handleAuthentication } = require('./handlers.js');

// declare the 404 function
const handleFourOhFour = (req, res) => {
  res.status(404).send("I couldn't find what you're looking for.");
};

// -----------------------------------------------------
// server endpoints
express()
  .use(morgan('dev'))
  .use(express.static('public'))
  .use(express.urlencoded({ extended: false }))
  .set('view engine', 'ejs')

  // endpoints
  .get('/', handleHomepage)
  .get('/users/:id', handleProfilePage)
  .get('/users/authenticated/:id', handleAuthentication)
  .get('/login', handleLogin)
  .get('/logout', handleLogout)
  .post('/getname', handleName)

  // a catchall endpoint that will send the 404 message.
  .get('*', handleFourOhFour)

  .listen(8000, () => console.log('Listening on port 8000'));
