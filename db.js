const mongoose = require('mongoose');
const config = require('config');
const mongoURI = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to mongo database successfully.....');
  } catch (err) {
    console.log('Could not connect to database');
    process.exit(1);
  }
};

module.exports = connectDB;
