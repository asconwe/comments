var Article = require("../models/article.js");

module.exports = function (app) {
    app.get("/comments/:_id", function (req, res) {
        var _id = req.params._id;
        Article.find({}, null, { sort: 'pubDate'}, function (err, articles) {
            if (err) console.log(err);
            articles.forEach(function (article, index) {
                if (article._id.toString() === _id) {
                    articles[index].commentsOpen = true;
                }
            })
            res.render("index", { articles: articles });
        })
    })
};