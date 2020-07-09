const { users } = require('./data/users');
let currentUser = {};
let authenticated = false;

function handleHomepage(req, res) {
  res.status(200).render('./pages/homepage', { users: users, user: currentUser, authenticated: authenticated });
}

function findUser(value, key = '_id') {
  return users.find(user => user[key] == value);
}

function findFriends(friendIDs) {
  return friendIDs.map(friend => {
    return friend = findUser(friend);
  });
}

function isLoggedIn() {
  return Object.keys(currentUser).length !== 0;
}

function handleProfilePage(req, res, next) {
  const userID = req.params.id;

  if (isLoggedIn() && currentUser._id == userID) {
    res.status(200).redirect(`./authenticated/${currentUser._id}`);
  }
  else {
    searchedUser = findUser(userID);

    if (searchedUser) {
      searchedUser.friends = findFriends(searchedUser.friends);
      res.status(200).render('./pages/profile', { user: searchedUser, authenticated: authenticated });
    }
    else next();
  }
}

function handleAuthentication(req, res, next) {
  let authenticatedID = req.params.id;

  if (isLoggedIn() && currentUser._id == authenticatedID) {
    authenticated = true;
    res.status(200).render('./pages/profile', { user: currentUser, authenticated: authenticated });
  }
  else next();
}

function handleLogin(req, res, next) {
  if (!isLoggedIn()) res.render('./pages/login', { authenticated: authenticated });
  else next();
}

function handleName(req, res) {
  const firstName = req.body.firstName;

  const searchedUser = findUser(firstName, 'name');

  if (searchedUser) {
    searchedUser.friends = findFriends(searchedUser.friends);

    currentUser = {...searchedUser};

    res.status(200).redirect(`./users/authenticated/${currentUser._id}`);
  }
  else res.status(404).redirect('./login');
}

module.exports = { handleHomepage, handleProfilePage, handleLogin, handleName, handleAuthentication };
