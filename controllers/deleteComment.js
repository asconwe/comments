var Article = require("../models/article.js");

module.exports = function (app) {
    app.delete("/api/delete/comment", function (req, res) {
        var _id = req.body._id;
        Article.findByIdAndRemove(_id, function () {
            res.redirect("/comments/" + _id);
        })
    })
};