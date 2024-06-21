const mongoose = require('mongoose');
require('dotenv').config();

const mongoDBUrl = process.env.MONGO_URI;

mongoose.connect(mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connection successful'))
  .catch(err => console.error('MongoDB connection error:', err));


const app = require('./index');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    }
);
