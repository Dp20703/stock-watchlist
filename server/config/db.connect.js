const mongoose = require('mongoose');
const url = process.env.DB_URL;

const connectDB = () => {
    mongoose.connect(url).then(() => {
        console.log("Connected to db...✅");
    }).catch((err) => {
        console.log("Failed to connect with db.. .❌", err);
    })
}
module.exports = connectDB;