const mongoCollections = require('../config/mongoCollection');
const user = mongoCollections.users;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {v4: uuidv4} = require('uuid');
require('dotenv').config();
const SALT_ROUNDS = 10;

module.exports = {
  async createUser(username, email, password, firstName, lastName, birthDate, weight, height) {
    const userCollection = await user();

    //see if username is already taken
    const checkUsername = await userCollection.findOne({username: username});
    if (checkUsername !== null) throw 'Username is taken!';

    //see if email is already taken
    const checkEmail = await userCollection.findOne({email: email});
    if (checkEmail !== null) throw 'A user is already registered with this email!';

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const userId = uuidv4();

    // create jwt for user
    const userToken = jwt.sign({userId: userId}, process.env.JWT_SECRET_KEY);

    //create new user object
    let newUser = {
      _id: userId,
      userToken, userToken,
      username: username,
      email: email,
      firstName: firstName,
      lastName: lastName,
      birthDate, birthDate,
      weight: weight,
      height: height,
      userMadeWorkouts: [],
      userLoggedWorkouts: []
    };

    const insertInfo = await userCollection.insertOne(newUser);
    if (!insertInfo.acknowledged || !insertInfo.insertedId) throw 'Insert user failed!';
    
    return newUser;
  }
}