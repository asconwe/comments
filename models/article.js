var mongoose = require("mongoose");
// var Comment = require("./comment.js");

var commentSchema = mongoose.Schema({
    heading: String,
    body: String,
});

var articleSchema = mongoose.Schema({
    title: String,
    link: String,
    pubDate: String,
    commentsOpen: Boolean,
    comments: [commentSchema]
});

articleSchema.methods.getNumbComments = function () { 
    return this.comments.length;
}

var Article = mongoose.model('Article', articleSchema);

module.exports = Article;