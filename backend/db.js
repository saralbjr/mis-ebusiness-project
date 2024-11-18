const mongoose = require('mongoose')
// const mongoDbClient = require("mongodb").MongoClient
const dotenv = require('dotenv');
dotenv.config()

const mongoURI = process.env.MONGO_URI;

// mongodb://<username>:<password>@merncluster-shard-00-00.d1d4z.mongodb.net:27017,merncluster-shard-00-01.d1d4z.mongodb.net:27017,merncluster-shard-00-02.d1d4z.mongodb.net:27017/?ssl=true&replicaSet=atlas-eusy5p-shard-0&authSource=admin&retryWrites=true&w=majority
module.exports = function (callback) {
    mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
        // mongoDbClient.connect(mongoURI, { useNewUrlParser: true }, async(err, result) => {
        if (err) console.log("---" + err)
        else {
            // var database =
            console.log("Connected to MongoDB")
            const foodCollection = await mongoose.connection.db.collection("Drink_Items");
            foodCollection.find({}).toArray(async function (err, data) {
                const categoryCollection = await mongoose.connection.db.collection("Drink_Category");
                categoryCollection.find({}).toArray(async function (err, Catdata) {
                    callback(err, data, Catdata);

                })
            });

        }
    })
};

// // Backend - Server File (e.g., `server.js` or `dataHandler.js`)

// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// dotenv.config();

// const mongoURI = process.env.MONGO_URI;

// // Merge Sort function to sort items based on price
// function mergeSort(arr, key) {
//     if (arr.length <= 1) {
//         return arr;
//     }

//     const mid = Math.floor(arr.length / 2);
//     const left = arr.slice(0, mid);
//     const right = arr.slice(mid);

//     return merge(
//         mergeSort(left, key),
//         mergeSort(right, key),
//         key
//     );
// }

// function merge(left, right, key) {
//     let result = [];
//     let i = 0;
//     let j = 0;

//     // Sort by '330ML' price as an example, modify if needed
//     while (i < left.length && j < right.length) {
//         if (parseFloat(left[i].options[0]["330ML"]) < parseFloat(right[j].options[0]["330ML"])) {
//             result.push(left[i]);
//             i++;
//         } else {
//             result.push(right[j]);
//             j++;
//         }
//     }

//     return result.concat(left.slice(i), right.slice(j));
// }

// // Function to fetch data and apply sorting
// module.exports = function (callback, sortOrder = '') {
//     mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
//         if (err) console.log("---" + err)
//         else {
//             console.log("Connected to MongoDB");

//             const foodCollection = await mongoose.connection.db.collection("Drink_Items");

//             // Fetch all items from the collection
//             foodCollection.find({}).toArray(async function (err, data) {
//                 const categoryCollection = await mongoose.connection.db.collection("Drink_Category");
//                 categoryCollection.find({}).toArray(async function (err, Catdata) {

//                     // Sort the data using Merge Sort based on the '330ML' price
//                     const sortedItems = mergeSort(data, 'price');

//                     // Apply ascending or descending order
//                     if (sortOrder === 'lowToHigh') {
//                         // Merge Sort already sorts in ascending order
//                     } else if (sortOrder === 'highToLow') {
//                         // Reverse the array for descending order
//                         sortedItems.reverse();
//                     }

//                     callback(err, sortedItems, Catdata);
//                 });
//             });
//         }
//     });
// };


// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// dotenv.config();

// const mongoURI = process.env.MONGO_URI;

// // Merge Sort function to sort items based on multiple price options
// function mergeSort(arr, key1, key2) {
//     if (arr.length <= 1) {
//         return arr;
//     }

//     const mid = Math.floor(arr.length / 2);
//     const left = arr.slice(0, mid);
//     const right = arr.slice(mid);

//     return merge(
//         mergeSort(left, key1, key2),
//         mergeSort(right, key1, key2),
//         key1,
//         key2
//     );
// }

// function merge(left, right, key1, key2) {
//     let result = [];
//     let i = 0;
//     let j = 0;

//     // Sort by multiple price options, prioritizing key1
//     while (i < left.length && j < right.length) {
//         const leftPrice1 = parseFloat(left[i].options[0][key1] || Infinity);
//         const rightPrice1 = parseFloat(right[j].options[0][key1] || Infinity);

//         const leftPrice2 = parseFloat(left[i].options[0][key2] || Infinity);
//         const rightPrice2 = parseFloat(right[j].options[0][key2] || Infinity);

//         if (leftPrice1 === rightPrice1) {
//             if (leftPrice2 < rightPrice2) {
//                 result.push(left[i]);
//                 i++;
//             } else {
//                 result.push(right[j]);
//                 j++;
//             }
//         } else if (leftPrice1 < rightPrice1) {
//             result.push(left[i]);
//             i++;
//         } else {
//             result.push(right[j]);
//             j++;
//         }
//     }

//     return result.concat(left.slice(i), right.slice(j));
// }

// // Function to fetch data and apply sorting
// module.exports = function fetchAndSortData(callback, sortOrder = '') {
//     mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
//         if (err) console.log("---" + err);
//         else {
//             console.log("Connected to MongoDB");

//             const foodCollection = await mongoose.connection.db.collection("Drink_Items");

//             // Fetch all items from the collection
//             foodCollection.find({}).toArray(async function (err, data) {
//                 const categoryCollection = await mongoose.connection.db.collection("Drink_Category");
//                 categoryCollection.find({}).toArray(async function (err, Catdata) {
//                     // Sort the data using Merge Sort based on the price options
//                     let sortedItems = mergeSort(data, '330ML', '650ML');

//                     // Apply ascending or descending order
//                     if (sortOrder === 'lowToHigh') {
//                         // Merge Sort already sorts in ascending order
//                     } else if (sortOrder === 'highToLow') {
//                         sortedItems.reverse(); // Reverse for descending order
//                     }

//                     callback(err, sortedItems, Catdata);
//                 });
//             });
//         }
//     });
// };
