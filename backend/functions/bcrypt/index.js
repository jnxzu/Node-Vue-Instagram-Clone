const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);

const hash = async (pswd) => bcrypt.hash(pswd, salt);

const compare = async (pswd, hsh) => bcrypt.compare(pswd, hsh);

module.exports = {
  hash,
  compare,
};
