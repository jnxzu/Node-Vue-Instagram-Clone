const mongoose = require('mongoose');

(async () => {
  try {
    // eslint-disable-next-line
    await mongoose.connect(process.env.DATABASE_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
  } catch (err) {
    process.exit(1);
  }
})();

module.exports = mongoose;
