const express = require('express');
const morgan = require('morgan');
const config = require('config');
const helmet = require('helmet');
const debug = require('debug')('app:start');
const mongoose = require('mongoose');
const logger = require('./middleware/logger');
const home = require('./routes/home');
const courses = require('./routes/courses');
const colors = require('./utils/colors');

const app = express();
const PORT = process.env.PORT || 3000;

debug.color = colors.cyan;

console.log('Application Name:', config.get('name'));
console.log('Mail Host:', config.get('mail.host'));
console.log('Mail Password:', config.get('mail.password'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use(logger);
if (app.get('env') === 'development') {
    app.use(morgan('dev'));
    debug('Morgan enabled...');
}

mongoose
    .connect('mongodb://127.0.0.1:27017/test', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => debug('Connected to MongoDB...'))
    .catch((err) => debug('Could not connect to MongoDB...', err));

app.use('/', home);
app.use('/api/courses', courses);

app.listen(PORT, () => {
    debug(`Listening on port ${PORT}...`);
});
