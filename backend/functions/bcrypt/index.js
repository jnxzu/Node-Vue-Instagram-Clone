const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);

const hash = async (pswd) => {
  const hashResult = await bcrypt.hash(pswd, salt);
  return hashResult;
};

const compare = async (pswd, hsh) => {
  const compareResult = await bcrypt.compare(pswd, hsh);
  return compareResult;
};

module.exports = {
  hash,
  compare,
};
