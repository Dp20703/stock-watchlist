const dotenv = require('dotenv');
dotenv.config();
const dbConnect = require('./config/db.connect');
dbConnect();
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 8000;


app.use('/api/watchlist', require('./routes/watchlist.route'));


app.get('/', (req, res) => {
    res.send('Hello world')
})

app.listen(PORT, () => {
    console.log(`server is listening on http://localhost:${PORT}`);
})