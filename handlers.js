function handleHomepage(req, res) {
  res.status(200).render('./pages/homepage', { users: users });
}

function findUser(value, key = '_id') {
  return users.find(user => user[key] == value);
}

function handleProfilePage(req, res, next) {
  const userID = req.params.id;

  const currentUser = findUser(userID);

  if (currentUser) {
    currentUser.friends = currentUser.friends.map(friend => {
      return friend = findUser(friend);
    });

    res.status(200).render('./pages/profile', { user: currentUser });
  }
  else next();
}

function handleLogin(req, res) {
  res.render('./pages/login');
}

function handleName(req, res) {
  const firstName = req.body.firstName;

  const currentUser = findUser(firstName, 'name');

  if (currentUser) {
    res.status(200).redirect(`./users/${currentUser._id}`);
  }
  else res.status(404).redirect('./login');
}

const { users } = require('./data/users');
let currentUser = {};

module.exports = { handleHomepage, handleProfilePage, handleLogin, handleName };
