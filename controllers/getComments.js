var Article = require("../models/article.js");

module.exports = function (app) {
    app.get("/comments/:_id", function (req, res) {
        var _id = req.params._id;
        Article.find({}, function (err, articles) {
            if (err) console.log(err);
            articles.forEach(function (article, index) {
                if (article._id.toString() === _id) {
                    console.log(typeof articles[index]);
                    articles[index].commentsOpen = true;
                    console.log(articles[index].commentsOpen);
                    console.log("=========================article=================", articles[index])
                    console.log(_id);
                    console.log(articles[index].commentsOpen);
                }
            })
            res.render("index", { articles: articles });
        })
    })
};