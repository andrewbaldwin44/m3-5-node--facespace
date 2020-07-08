function handleHomepage(req, res) {
  res.render('./pages/homepage', { users: users });
}

function findUser(id) {
  return users.find(user => user._id == id);
}

function handleProfilePage(req, res) {
  const userID = req.params.id;

  const currentUser = findUser(userID);
  currentUser.friends = currentUser.friends.map(friend => {
    return friend = findUser(friend);
  });

  res.render('./pages/profile', { user: currentUser });
}

const { users } = require('./data/users');
let currentUser = {};

module.exports = { handleHomepage, handleProfilePage };
