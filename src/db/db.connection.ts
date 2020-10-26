const mongoose = require('mongoose');
const mongodb = require('mongodb');

export function connect() {
    mongoose.connect(process.env.DB_URL, {useNewUrlParser: true});
}
