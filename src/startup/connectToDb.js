const mongoose = require('mongoose');

function connectToDb(debug) {
    mongoose
        .connect('mongodb://127.0.0.1:27017/test', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => debug('Connected to MongoDB...'))
        .catch((err) => debug('Could not connect to MongoDB...', err));
}

module.exports = connectToDb;
