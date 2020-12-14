const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);

const hash = (pswd) => {
  return bcrypt.hashSync(pswd, salt);
};

const compare = (pswd, hsh) => {
  return bcrypt.compareSync(pswd, hsh);
};

module.exports = {
  hash,
  compare,
};
