var mongoose = require("mongoose");

var articleSchema = mongoose.Schema({
    title: String,
    link: String,
    pubDate: String,
    comments: Array,
    // numbComments: () => this.comments.length
});

var Article = mongoose.model('Article', articleSchema);

module.exports = Article;