const express = require('express');
const morgan = require('morgan');

// Routers
const userRoute = require('./src/routes/userRouter');
const postRoute = require('./src/routes/postRouter');
const commentRoute = require('./src/routes/commentRouter');


const app = express();

app.use(express.json());

app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/comments', commentRoute);

app.get('/', (req, res) => {
    res.send('Welcome!');
    }
);

app.use((req, res, next) => {
    console.log(req.body)
    next();
})

module.exports = app;