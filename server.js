const express = require('express');
const app = express();
const connectDB = require('./db.js');

connectDB();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/', require('./routes/api/exercise.js'));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
