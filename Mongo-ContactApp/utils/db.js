const mongoose = require('mongoose');
// Koneksi ke mongoDB
mongoose.connect('mongodb://127.0.0.1:27017/testing', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});