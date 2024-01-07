const express = require('express')
const router = express.Router()
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient;

const mongoURI = 'mongodb+srv://saralbjr1:saral123@cluster0.yvg1dbw.mongodb.net/DrinkMandu?retryWrites=true&w=majority'
const dbName = 'DrinkMandu'
const collectionName = 'Drink_Items'

router.get('/items', async (req, res) => {
    try {
      const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
      await client.connect();

      const db = client.db(dbName);
      const collection = db.collection(collectionName);
      const items = await collection.find().toArray();
      client.close();

      res.json(items);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  });

  module.exports = router;