var Article = require("../models/article.js");

module.exports = function (app) {
    app.post("/api/new/comment", function (req, res) {
        var _id = req.body._id;
        Article.findByIdAndUpdate(_id, { $push: { comments: { heading: req.body.header, body: req.body.body } } }, function () {
            res.redirect("/comments/" + _id);
        })
    })
};