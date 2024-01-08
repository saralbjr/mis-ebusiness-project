const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const cors = require('cors')

const mongoURI = 'mongodb+srv://saralbjr1:saral123@cluster0.yvg1dbw.mongodb.net/DrinkMandu?retryWrites=true&w=majority';
const dbName = 'DrinkMandu';
const collectionName = 'Drink_Items';
const categoryCollection = 'Drink_Category';

router.use(cors())

// Ensure MongoDB connection is established before setting up routes
MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    return;
  }

  // Set up global.db after connecting to MongoDB
  global.db = client.db(dbName);

  // Set up routes after MongoDB connection is established
  router.get('/items', async (req, res) => {
    try {
      const collection = global.db.collection(collectionName);
      const items = await collection.find().toArray();
      res.json(items);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  });

  router.post('/items/add', async (req, res) => {
    const { name, CategoryName, options, imageUrl } = req.body;

    try {
      // Directly insert the item into the MongoDB collection
      await global.db.collection(collectionName).insertOne({
        name,
        CategoryName,
        options,
        img: imageUrl,
      });

      // Respond with a success message or other relevant data
      res.json({ success: true, message: 'Item added successfully' });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  });

  router.get('/categories', async (req, res) => {
    try {
      const collection = global.db.collection(categoryCollection);
      const categories = await collection.find().toArray();
      res.json(categories);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  });

  router.get('/options', async (req, res) => {
    try {
      const collection = global.db.collection(collectionName);

      // Use an aggregation pipeline to project the options in the desired format
      const options = await collection.aggregate([
        {
          $project: {
            _id: 0,
            options: {
              $map: {
                input: [
                  { name: '330ML', price: { $toString: '$options.330ML' } },
                  { name: '650ML', price: { $toString: '$options.650ML' } }
                ],
                as: 'opt',
                in: {
                  name: '$$opt.name',
                  price: '$$opt.price'
                }
              }
            }
          }
        }
      ]).toArray();

      res.json(options);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  });



  // Close the MongoDB connection when the application exits
  process.on('SIGINT', () => {
    client.close();
    process.exit();
  });
});

router.delete('/items/delete/:itemId', async (req, res) => {
  const itemId = req.params.itemId;

  try {
    // Delete the item from the MongoDB collection
    const result = await global.db.collection(collectionName).deleteOne({ _id: mongodb.ObjectID(itemId) });

    if (result.deletedCount === 1) {
      res.json({ success: true, message: 'Item deleted successfully' });
    } else {
      res.status(404).json({ success: false, message: 'Item not found' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});


router.put('/items/update/:itemId', async (req, res) => {
  const itemId = req.params.itemId;
  const { name, CategoryName, options, imageUrl } = req.body;

  try {
    const collection = global.db.collection(collectionName);

    // Update the item in the MongoDB collection
    const result = await collection.updateOne(
      { _id: mongodb.ObjectID(itemId) },
      {
        $set: {
          name,
          CategoryName,
          options,
          img: imageUrl,
        }
      }
    );

    if (result.modifiedCount === 1) {
      res.json({ success: true, message: 'Item updated successfully' });
    } else {
      res.status(404).json({ success: false, message: 'Item not found' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});


module.exports = router;
