const express = require('express');
const router = express.Router();
const validation = require('../data/validation');
const cardsDB = require('../data/cards');

router.use(express.json());
router.use(express.urlencoded({extended: true}));

router.get('/', async (req, res) => {
  // make sure user is logged in
  if (!req.headers.authorization) {
    res.status(401).json({error: 'User is not authenticated!'});
  } else {
    // user is logged in -> get list of cards
    try {
      let cardList = await cardsDB.getCards(req.headers.authorization);
      
      if (cardList) {
        res.status(200).json(cardList);
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