const userRoutes = require('./users');
// const commentRoutes = require('./comments');
// const exerciseRoutes = require('./exercises');
const workoutLogRoutes = require('./workoutLogs');
const workoutRoutes = require('./workouts');
// const workoutSearchRoutes = require('./workoutSearch');

const constructorMethod = (app) => {
    app.use('/', userRoutes);
    app.use('/workout', workoutRoutes);
    app.use('/workoutlog', workoutLogRoutes);
    // app.use('/', workoutSearchRoutes);
    app.use('*', (req, res) => {
        res.sendStatus(404);
    })
}

module.exports = constructorMethod;