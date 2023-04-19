const express = require('express');
const router = express.Router();
const validation = require('../data/validation');
const workoutLogsDB = require('../data/workoutLogs');

router.use(express.json());
router.use(express.urlencoded({extended: true}));

router.post('/create', async (req, res) => {
  errors = []

  //verify user token
  if (!req.headers.authorization) {
    errors.push({error: 'Need to authenticate to create workout.'});
  }
  //verify work out name
  if (!req.body.workoutName) {
    errors.push({error: 'Name must be provided.'});
  }
  //verify work out date
  if (!req.body.workoutDate) {
    errors.push({error: 'Date must be provided.'});
  }
  //verify work out length
  if (!req.body.workoutLength) {
    errors.push({error: 'Length must be provided.'});
  }
  //verify work out intensity
  if (!req.body.workoutIntensity) {
    errors.push({error: 'Intensity must be provided.'});
  }
  //verify work out exercises
  if (!req.body.exercises) {
    errors.push({error: 'Exercises must be provided.'});
  }
  
  //see if any errors
  if (errors.length > 0) {
    //send errors
    console.log(errors)
    res.status(400).json({error: errors});
  } else {
    //no errors -> try and create workout
    try {
      let createdWorkout = await workoutLogsDB.createWorkout(req.headers.authorization, req.body);
      if (createdWorkout) {
        res.status(201).json(createdWorkout);
      } else {
        res.status(500).json({error: "Something went wrong!"});
      }
    } catch (e) {
      console.log(e)
      res.status(500).json({error: "Something went wrong!"});
    }
    
  }

});

router.get('/list', async (req, res) => {

  // make sure user is logged in
  if (!req.headers.authorization) {
    res.status(401).json({error: 'User is not authenticated!'});
  } else {
    // user is logged in -> get their list of workouts
    try {
      let workoutList = await workoutLogsDB.getWorkouts(req.headers.authorization);
      
      if (workoutList) {
        res.status(200).json(workoutList);
      } else {
        res.status(500).json({error: "Something went wrong!"});
      }
    } catch (e) {
      console.log(e)
      res.status(500).json({error: "Something went wrong!"});
    }
  }
});

module.exports = router;