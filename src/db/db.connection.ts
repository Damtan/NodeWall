const mongoose = require('mongoose');

export function connect() {
    mongoose.connect(process.env.DB_URL, {useNewUrlParser: true});
}