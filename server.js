const express = require('express');
const { Db } = require('mongodb');
const db = require('./config/connection');

const { NAME OF THING } = require('./models');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// REQUESTS GO HERE

db.once('open'), () => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}!`);
    });
};