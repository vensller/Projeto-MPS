const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mps', {useNewUrlParser: true});
mongoose.Promise = global.Promise;

module.exports = mongoose; 