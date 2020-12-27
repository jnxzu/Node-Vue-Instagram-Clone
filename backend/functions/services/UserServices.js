/* eslint-disable consistent-return */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
const User = require('../models/User.js');
const bcrypt = require('../bcrypt');
// const passport = require('passport');


// eslint-disable-next-line no-unused-vars
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(403).json({
    message: 'Not authenticated',
  });
};

// eslint-disable-next-line no-unused-vars
const authMiddleware = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.status(401).send('You are not authenticated');
  } else {
    return next();
  }
};

const processErrors = (err) => {
  const msg = {};
  for (const key in err.errors) {
    msg[key] = err.errors[key].user;
  }
  return msg;
};

const saveUser = (user, res) => {
  user.save((err, doc) => {
    if (err) {
      // Unprocessable Entity
      res.status(422).json(processErrors(err));
    } else {
      res.json(doc);
    }
  });
};

module.exports.saveUser = saveUser;

module.exports.create = (req, res) => {
  const passwordHash = bcrypt.hash(req.body.password);
  const user = new User({
    username: req.body.username,
    password: passwordHash,
  });
  saveUser(user, res);
};

module.exports.read = (req, res, next) => {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      next(err);
    } else if (user) {
      res.json(user);
    } else {
      // Not Found
      res.sendStatus(404);
    }
  });
};

module.exports.list = (req, res, next) => {
  User.find({ username: { $ne: req.body.current } }, (err, users) => {
    if (err) {
      next(err);
    } else {
      res.json(users);
    }
  });
};

module.exports.login = (req, res) => {
  return res.json({
    currentUserId: req.user._id,
    currentUserName: req.user.username,
    isAdmin: req.user.isAdmin,
  });
} 

module.exports.register = (req, res) => {
  const { username, email, password } = req.body;

  User.findOne({ username }).then((userByUsername) => {
    if (userByUsername) {
      return res.status(400).json({
        msg: 'Username already exists',
      });
    }

    return User.findOne({ email }).then((userByEmail) => {
      if (userByEmail) {
        return res.status(400).json({
          msg: 'Email already exists',
        });
      }

      // const hashedPw = bcrypt.genSalt(10, (_, salt) => {
      //   bcrypt.hash(password, salt, (err, hash) => {
      //     if (err) throw err;
      //     return hash;
      //   });
      // });

      const newUser = new User();
      newUser.username = username;
      newUser.email = email;
      newUser.isAdmin = false;
      newUser.avatarUrl = '';
      newUser.posts = [];
      newUser.following = [];
      newUser.followers = [];
      newUser.generateHash(password).then(function assignHash(hash) {
        newUser.password = hash;
      });

      newUser.save().then(() => {
        return res.status(201).json({
          currentUserId: newUser._id,
          currentUserName: newUser.username,
          isAdmin: newUser.isAdmin,
        });
      });

      return res.status(500);
    });
  });
}

module.exports.logout = (req, res) => {
  if (req.session.passport === undefined) res.status(401).json({ msg: 'Unauthorized' });
  else {
    req.logOut();
    req.session.destroy((err) => {
      if (err) return res.status(500);
      return res.json({ loggedOut: true });
    });
  }
}

module.exports.profile = (req, res) => {
  const { username } = req.params;
  User.findOne({ username }).then((userByUsername) => {
    if (userByUsername) {
      return res.status(200).json({
        bio: userByUsername.bio,
        avatarUrl: userByUsername.avatarUrl,
        posts: userByUsername.posts,
        followers: userByUsername.followers,
        following: userByUsername.following,
      });
    }
    return res.status(404).json({
      msg: 'User with this username does not exist.',
    });
  });
}

module.exports.follow = (req, res) => {
  if (req.session.passport === undefined) res.status(401).json({ msg: 'Unauthorized' });
  else {
    const username2 = req.params.username;
    const username1 = req.session.passport.user;
    // ADD: USER CAN'T FOLLOW HIS OWN ACCOUNT
    User.findOne({ _id: username1 }).then((userByUsername1) => {
      if (userByUsername1) {
        User.findOne({ username: username2 }).then((userByUsername2) => {
          if (userByUsername2) {
            const n1 = userByUsername1;
            const n2 = userByUsername2;
            const i1 = n1.following.indexOf(userByUsername2._id);
            const i2 = n2.followers.indexOf(userByUsername1._id);
            if (i1 > -1 && i2 > -1) {
              n1.following.splice(i1, 1);
              n2.followers.splice(i2, 1);
            }
            if (i1 === -1 && i2 === -1) {
              n1.following.push(userByUsername2._id);
              n2.followers.push(userByUsername1._id);
            }
            // eslint-disable-next-line no-unused-vars
            User.findByIdAndUpdate(userByUsername1._id, n1, (err, u1) => {
              if (err) res.statusCode(500);
              else {
                // eslint-disable-next-line no-shadow
                User.findByIdAndUpdate(userByUsername2._id, n2, (err, userByUsername2) => {
                  if (err) res.statusCode(500);
                  else return res.json(userByUsername2.followers);
                });
              }
            });
          }
          else {
            return res.status(404).json({
              msg: "User not found."
            });
          }
        });
      }
      else {
        return res.status(400).json({
          msg: "Please log in."
        });
      }
    });
  }
}

module.exports.search = (req, res) => {
  const { phrase } = req.body;
  User.find({ username: {$regex: phrase, $options: 'i'} }).limit(5).then((results) => {
    return res.json(results.map(r => r.username));
  });
}

// module.exports.update = (req, res, next) => {
//   User.findById(req.params.id, (err, user) => {
//     if (err) {
//       next(err);
//     } else if (user) {
//       // eslint-disable-next-line no-param-reassign
//       user.username = req.body.username;
//       // eslint-disable-next-line no-param-reassign
//       user.password = req.body.password;
//       saveUser(user, res);
//     } else {
//       // Not Found
//       res.sendStatus(404);
//     }
//   });
// };

// module.exports.delete = (req, res, next) => {
//   User.findByIdAndRemove(req.params.id, (err) => {
//     if (err) {
//       return next(err);
//     }
//     // No Content
//     res.sendStatus(204);
//   });
// };

// module.exports.validateId = (req, res, next) => {
//   const idRegExp = /^[0-9a-fA-F]{24}$/;
//   if (!req.params.id.match(idRegExp)) {
//     // Bad Request
//     return res.sendStatus(400);
//   }
//   next();
// };

// module.exports.logout =
//   (isAuthenticated,
//   (req, res) => {
//     console.log('Logging out..');
//     req.logout();
//     res.status(200).json({
//       isAuth: req.isAuthenticated(),
//     });
//   });

// module.exports.login = async (req, res) => {
//   res.status(200).send({ isAuthenticated: true, user: req.user });
// };

// module.exports.loggeduser = (req, res) => {
//   if (req.isAuthenticated()) {
//     res.json({
//       isAuthenticated: req.isAuthenticated(),
//       user: req.user,
//     });
//   } else {
//     res.json({
//       isAuthenticated: req.isAuthenticated(),
//       user: {},
//     });
//   }
// };

// module.exports.authMiddleware = authMiddleware;

// module.exports.processErrors = (err) => {
//   const msg = {};
//   for (const key in err.errors) {
//     msg[key] = err.errors[key].message;
//   }
//   return msg;
// };

// module.exports.register = async (req, res) => {
//   try {
//     const passwordHash = bcrypt.hash(req.body.password);
//     const user = new User({
//       username: req.body.username,
//       password: passwordHash,
//     });
//     console.log(req.body);
//     const doc = await user.save();
//     return res.json(doc);
//   } catch (err) {
//     if (!req.body.password) {
//       // Unprocessable Entity
//       return res.status(422).json({
//         password: 'Error – password must not be empty!',
//       });
//     }
//     return res.status(422).json(User.processErrors(err));
//   }
// };
