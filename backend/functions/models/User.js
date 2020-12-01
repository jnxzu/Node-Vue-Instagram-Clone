/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
const uniqueValidator = require('mongoose-unique-validator');
const mongoose = require('../mongoose');
const bcrypt = require('../bcrypt');

const { Schema } = mongoose;
const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
    },
    password: {
      type: String,
      required: true,
      minlength: 3,
    },
  },
  { timestamps: true }
);

// /*// bez poniższej wtyczki nie dostaniemy sensownego sygnału
// // błędu przy naruszeniu „unikatowości” nazwy użytkownika

// // ale z nią – już wszystko będzie jak należy
UserSchema.plugin(uniqueValidator);

UserSchema.methods.isValidPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

delete mongoose.connection.models.User;
let User = mongoose.model('User', UserSchema);

User.processErrors = (err) => {
  const msg = {};
  for (const key in err.errors) {
    msg[key] = err.errors[key].message;
  }
  return msg;
};

global.UserSchema = global.UserSchema || User;
// module.exports = global.UserSchema; */

// eslint-disable-next-line no-const-assign
// eslint-disable-next-line no-multi-assign
module.exports = User = mongoose.model('users', UserSchema);
