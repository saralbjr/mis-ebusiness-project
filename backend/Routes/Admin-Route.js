const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const cors = require('cors')
const dotenv = require('dotenv');
dotenv.config();

const mongoURI = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;
const collectionName = process.env.COLLECTION_NAME;
const categoryCollection = process.env.CATEGORY_COLLECTION;
const userCollection = process.env.USER_COLLECTION;
const orderDetails = process.env.ORDER_DETAILS_COLLECTION;
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

router.get('/users', async (req, res) => {
  try {
    const collection = global.db.collection(userCollection);
    const users = await collection.find().toArray();
    res.json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// Modify your existing code to include a new route for fetching all order data
router.get('/allOrders', async (req, res) => {
  try {
    const collection = global.db.collection(orderDetails); // Replace 'orders' with the actual name of your collection
    // Fetch all order data from the collection
    const allOrders = await collection.find().toArray();

    res.json(allOrders);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// Add a new route to handle the DELETE request for banning a user
router.delete('/users/ban/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const collection = global.db.collection(userCollection);
    const result = await collection.deleteOne({ _id: mongodb.ObjectID(userId) });

    if (result.deletedCount === 1) {
      res.json({ success: true, message: 'User banned successfully' });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});


module.exports = router;
