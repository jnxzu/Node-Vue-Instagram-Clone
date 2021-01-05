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
    console.error(err);
    // eslint-disable-next-line
    process.exit(1);
  }
})();

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Błąd połączenia z MongoDb: '));

module.exports = mongoose;
