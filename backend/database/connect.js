// getting-started.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/myNotesdb', { useNewUrlParser: true, useUnifiedTopology: true });
const connectToMongo = () => {
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        // we're connected!
        console.log('connected to db successfully')
    });
}
module.exports = connectToMongo;