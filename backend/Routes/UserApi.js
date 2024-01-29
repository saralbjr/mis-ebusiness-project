const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const router = express.Router();

const mongoURI = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;
const userCollection = process.env.USER_COLLECTION;

// Replace 'your-secret-key' with your actual secret key


// API endpoint to fetch the information of the currently logged-in user
router.get('/userInfo', async (req, res) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - Token not provided' });
    }

    try {
        // Decode the token without verifying it
        const decoded = jwt.decode(token);

        if (!decoded || !decoded.user) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        const userEmail = decoded.user.email;

        // Establish a connection to your MongoDB database
        const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();

        // Fetch only the details of the currently logged-in user
        const collection = client.db(dbName).collection(userCollection);
        const user = await collection.findOne({ email: userEmail });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Send only necessary information to the client
        const { _id, email, name, /* other fields as needed */ } = user;
        res.json({ _id, email, name /* other fields as needed */ });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

router.use(cors());

module.exports = router;
