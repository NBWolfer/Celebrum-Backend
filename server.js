const mongoose = require('mongoose');
require('dotenv').config();

const mongoDBUrl = process.env.MONGO_URI;

mongoose.connect(mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connection successful'))
  .catch(err => console.error('MongoDB connection error:', err));


const app = require('./index');
const errorHandler = require('./src/middlewares/errorHandler');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const rfs = require('rotating-file-stream'); // Log dosyalarını döndürmek için

const logDirectory = path.join(__dirname, 'log');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory); // Log dizini yoksa oluştur

const accessLogStream = rfs.createStream('access.log', {
  interval: '1h', // Günde bir döndür
  path: logDirectory
});

const prodLogStream = rfs.createStream('prod.log', {
  interval: '1d', // Günde bir döndür
  path: logDirectory
});

// Argümanlardan ortam bilgisini al
args = process.argv.slice(2);

if(args.includes('--development')){
  process.env.NODE_ENV = 'development';
}
else if(args.includes('--production')){
  process.env.NODE_ENV = 'production';
}
else{
  process.env.NODE_ENV = 'development';
}

// development ortamında hata mesajlarını göster
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev', { stream: accessLogStream }));
}
else{
  app.use(morgan('tiny', { stream: prodLogStream }));
}
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    }
);
