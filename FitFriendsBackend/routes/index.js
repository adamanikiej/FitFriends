const userRoutes = require('./users');
const workoutLogRoutes = require('./workoutLogs');
const workoutRoutes = require('./workouts');
const cardRoutes = require('./cards');

const constructorMethod = (app) => {
    app.use('/', userRoutes);
    app.use('/workout', workoutRoutes);
    app.use('/workoutlog', workoutLogRoutes);
    app.use('/cards', cardRoutes);
    app.use('*', (req, res) => {
        res.sendStatus(404);
    })
}

module.exports = constructorMethod;