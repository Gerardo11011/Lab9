var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/yourDatabase', { useNewUrlParser: true });
var Schema = mongoose.Schema;

exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/gerardo-blog-post';
exports.PORT = process.env.PORT || 8080;
