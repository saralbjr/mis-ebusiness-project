const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { mergeSort } = require('./utils/sortUtils');  // Import the sorting utility

dotenv.config();

const mongoURI = process.env.MONGO_URI;

module.exports = function (callback) {
    mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
        if (err) console.log("---" + err);
        else {
            console.log("Connected to MongoDB");
            const foodCollection = await mongoose.connection.db.collection("Drink_Items");

            foodCollection.find({}).toArray(async function (err, data) {
                if (err) {
                    console.log("Error fetching data:", err);
                    callback(err, null, null);
                } else {
                    // Sort the data by price
                    const sortedData = mergeSort(data);  // Apply Merge Sort

                    const categoryCollection = await mongoose.connection.db.collection("Drink_Category");
                    categoryCollection.find({}).toArray(async function (err, Catdata) {
                        callback(err, sortedData, Catdata);  // Pass sorted data
                    });
                }
            });
        }
    });
};
