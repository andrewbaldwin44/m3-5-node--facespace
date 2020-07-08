function handleHomepage(req, res) {
  res.render('./pages/homepage', { users: users });
}

const { users } = require('./data/users');
let currentUser = {};

module.exports = { handleHomepage };
