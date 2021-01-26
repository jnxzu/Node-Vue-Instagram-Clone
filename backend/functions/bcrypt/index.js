const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);

const hash = (pswd) => bcrypt.hash(pswd, salt);

const compare = async (pswd, hsh) => {
  const compareResult = await bcrypt.compare(pswd, hsh);
  return compareResult;
};

module.exports = {
  hash,
  compare,
};
