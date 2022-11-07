const express = require('express');
const { Db } = require('mongodb');
const db = require('./config/connection');

// const { NAME OF THING COMING FROM MODELS } = require('./models');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open'), () => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}!`);
    });
};