const express = require('express');
const router = express.Router();
const validation = require('../data/validation');
const usersDB = require('../data/users');

router.use(express.json());
router.use(express.urlencoded({extended: true}));

// when user is created:
  // const token = jwt.sign({userId: 123}, process.env.JWT_SECRET_KEY);
  // store this in the user document as well
  // return this in json and store in storage on app
  // on all calls after to authenticate user pass token in auth header 

router.post('/signup', async (req, res) => {
  errors = []
  console.log('here:', req.body);

  //verify username
  if (!req.body.inputUsername) {
    errors.push({error: 'Username must be provided.'});
  }
  //verify email
  if (!req.body.inputEmail) {
    errors.push({error: 'Email must be provided.'});
  }
  try {
    validation.verifyEmail(req.body.inputEmail);
  } catch (e) {
    errors.push({error: 'Email must be valid.'});
  }
  //verify password
  if (!req.body.inputPassword) {
    errors.push({error: 'Password must be provided.'});
  }
  //verify first name
  if (!req.body.inputFirstName) {
    errors.push({error: 'First name is not provided.'});
  }
  if (!req.body.inputFirstName.trim().length) {
    errors.push({error: 'First name can\'t have numbers, be an empty string, or just spaces.'});
  }
  //verify last name
  if (!req.body.inputLastName) {
    errors.push({error: 'Last name is not provided.'});
  }
  if (!req.body.inputLastName.trim().length) {
    errors.push({error: 'Last name can\'t have numbers or be just spaces.'});
  }
  //verify weight if provided
  if (req.body.inputWeight) {
    try {
      validation.verifyWeight(parseInt(req.body.inputWeight));
    } catch (e) {
      errors.push({error: 'If weight is provided, it must be between 0 and 1400.'});
    }
  }
  //verify height if provided
  if (req.body.inputHeight) {
    try {
      validation.verifyHeight(parseInt(req.body.inputHeight));
    } catch (e) {
      errors.push({error: 'If height is provided, it must be between 0 and 108.'});
    }
  }
  //verify birthdate
  try {
    let birthDate = new Date(req.body.inputBirthDate + 'T00:00');
    validation.verifyBirthDate(birthDate);
  } catch (e) {
    errors.push({error: 'You must be between 13 and 120 years old.'});
  }

  //see if any errors
  if (errors.length > 0) {
    console.log('errors:', errors)
    //send errors
    res.status(400).json({error: errors});
  } else {
    //no errors -> try and create user
    try {
      let createdUser = await usersDB.createUser(
        req.body.inputUsername,
        req.body.inputEmail,
        req.body.inputPassword,
        req.body.inputFirstName,
        req.body.inputLastName,
        req.body.inputBirthDate,
        req.body.inputWeight,
        req.body.inputHeight
      );
      //see if user created
      if (createdUser) {
        res.status(201).json({token: createdUser.userToken});
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
