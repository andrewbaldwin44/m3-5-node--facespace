const { users } = require('./data/users');
let currentUser = {};
let authenticated = false;

function findUser(value, key = '_id') {
  return users.find(user => {
    return user[key] == value
  });
}

function findFriends(friendIDs) {
  return friendIDs.map(friend => {
    return friend = findUser(friend);
  });
}

function isLoggedIn() {
  return Object.keys(currentUser).length !== 0;
}

function handleHomepage(req, res) {
  res.status(200)
     .render('./pages/homepage', { users: users, user: currentUser,
                                   authenticated: authenticated });
}

function handleProfilePage(req, res, next) {
  const userID = req.params.id;

  if (isLoggedIn() && currentUser._id == userID) {
    res.status(200).redirect(`/users/authenticated/${currentUser._id}`);
  }
  else {
    console.log('*************')
    const searchedUser = {...findUser(userID)};

    if (searchedUser) {
      searchedUser.friends = findFriends(searchedUser.friends);
      console.log(users)

      res.status(200).render('./pages/profile', { user: searchedUser,
                                                  authenticated: authenticated });
    }
    else next();
  }
}

function handleAuthentication(req, res, next) {
  let authenticatedID = req.params.id;

  if (isLoggedIn() && currentUser._id == authenticatedID) {
    authenticated = true;
    res.status(200).render('./pages/authenticated_profile', { user: currentUser,
                                                              authenticated: authenticated });
  }
  else next();
}

function handleLogin(req, res, next) {
  if (!isLoggedIn()) res.render('./pages/login', { authenticated: authenticated, onLogin: true });
  else next();
}

function handleLogout(req, res, next) {
  if (isLoggedIn()) {
    currentUser = {};
    authenticated = false;
    res.status(200).redirect('/');
  }
  else next();
}

function handleName(req, res) {
  const firstName = req.body.firstName;

  const authenticateUser = {...findUser(firstName, 'name')};

  if (authenticateUser) {
    authenticateUser.friends = findFriends(authenticateUser.friends);

    currentUser = {...authenticateUser};

    res.status(200).redirect(`/users/authenticated/${currentUser._id}`);
  }
  else res.status(404).redirect('/login');
}

module.exports = { handleHomepage, handleProfilePage, handleLogin,
                   handleLogout, handleName, handleAuthentication };
