var commentSchema = mongoose.Schema({
    heading: String,
    text: String,
});

var Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;