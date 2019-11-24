const express = require('express');
const app = express();
const connectDB = require('./db.js');
const cors = require('cors');

connectDB();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ extended: false }));

app.use('/', require('./routes/api/exercise.js'));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
