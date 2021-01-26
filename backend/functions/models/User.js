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
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
    },
    avatarUrl: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      required: true,
    },
    bio: {
      type: String,
    },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

UserSchema.plugin(uniqueValidator);

UserSchema.methods.generateHash = async (password) => {
  const bcryptResult = await bcrypt.hash(password);
  return bcryptResult;
};
UserSchema.methods.isValidPassword = async (password, hash) => {
  const bcryptResult = await bcrypt.compare(password, hash);
  return bcryptResult;
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
