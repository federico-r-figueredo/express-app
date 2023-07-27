const home = require('../routes/home');
const courses = require('../routes/courses');
const authenticate = require('../routes/authenticate');
const users = require('../routes/users');

function setupRoutes(app) {
    app.use('/', home);
    app.use('/api/courses', courses);
    app.use('/api/users', users);
    app.use('/api/authenticate', authenticate);
}

module.exports = setupRoutes;
