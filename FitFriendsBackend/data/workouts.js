const mongoCollections = require('../config/mongoCollection');
const workoutC = mongoCollections.workouts;
const card = mongoCollections.cards;
const user = mongoCollections.users;
const jwt = require('jsonwebtoken');
const {v4: uuidv4} = require('uuid');
require('dotenv').config();

module.exports = {
  async createWorkout(userToken, workout) {
    const workoutCollection = await workoutC();

    const workoutId = uuidv4();

    //get userId from token
    let userId = null;
    let username = null;
    try {
      const decoded = jwt.verify(userToken, process.env.JWT_SECRET_KEY);
      userId = decoded.userId;
      username = decoded.username;
    } catch (e) {
      console.log(e);
      throw 'Invalid user token!';
    }

    let newWorkout = {
      _id: workoutId,
      author: userId,
      workoutName: workout.workoutName,
      workoutLength: workout.workoutLength,
      workoutIntensity: workout.workoutIntensity,
      exercises: workout.exercises,
    }

    //insert new workout into workout collection
    const insertInfo = await workoutCollection.insertOne(newWorkout);
    if (!insertInfo || !insertInfo.insertedId) throw 'Could not add new workout';

    //insert new workout into card collection
    await module.exports.addWorkoutCard(userId, username, workout);

    //insert new workout into user object
    const newId = insertInfo.insertedId.toString();
    await module.exports.addWorkoutToUser(userId, newId);

    return workout;
  },
  async addWorkoutCard(userId, username, workout) {
    const cardCollection = await card();

    const cardId = uuidv4();

    let newCard = {
      _id: cardId,
      date: new Date(),
      text: 'has logged a workout!',
      user: {
        _id: userId,
        username: username
      },
      cardType: "workout",
      cardContent: workout,
      likes: 0,
      comments: []
    }

    //insert new workout into card collection
    const insertInfo = await cardCollection.insertOne(newCard);
    if (!insertInfo || !insertInfo.insertedId) throw 'Could not add new card';

    return;
  },
  async addWorkoutToUser(userId, workoutId) {
    const userCollection = await user();

    // get user object
    const userFound = await userCollection.findOne({_id: userId});
    if (userFound === null) throw 'No user found with this id';

    // add workoutId to list
    userFound.userMadeWorkouts.push(workoutId);

    // update user object
    const updatedInfo = await userCollection.updateOne(
      {_id: userId},
      {$set: {userMadeWorkouts: userFound.userMadeWorkouts}}
    );
    if (updatedInfo.modifiedCount <= 0) throw 'Could not add workout to user!'
    return;
  },
  async getWorkouts(userToken) {
    const workoutCollection = await workoutC();

    let userId = null;
    try {
      const decoded = jwt.verify(userToken, process.env.JWT_SECRET_KEY);
      userId = decoded.userId;
    } catch (e) {
      console.log(e);
      throw 'Invalid user token!';
    }

    const workoutList = workoutCollection.find({author: userId}).toArray();
    
    return workoutList;
  }
}