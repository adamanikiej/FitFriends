const mongoCollections = require('../config/mongoCollection');
const card = mongoCollections.cards;
const jwt = require('jsonwebtoken');
const {v4: uuidv4} = require('uuid');
require('dotenv').config();

module.exports = {
  async getCards(userToken) {
    const cardCollection = await card();

    //validate token
    try {
      const decoded = jwt.verify(userToken, process.env.JWT_SECRET_KEY);
    } catch (e) {
      console.log(e);
      throw 'Invalid user token!';
    }

    const cardList = cardCollection.find().sort({ date: -1}).limit(10).toArray();

    return cardList;
  }
}