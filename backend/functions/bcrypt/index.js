const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);

const hash = (pswd) => bcrypt.hash(pswd, salt);

const compare = (pswd, hsh) => bcrypt.compare(pswd, hsh);

module.exports = {
  hash,
  compare,
};
