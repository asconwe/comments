var request = require("request");
var cheerio = require("cheerio");
var Article = require("../models/article.js");

//
function handleScrapedData(html, item, index, articlesArr, finished) {
    // Load the html body from request into cheerio
    const $ = cheerio.load(html);
    var element = $(item)[index];
    console.log("in handle");
    // Save title
    var title = $(element).children("title").html();
    // Save link
    var link = $(element).children("guid").html();
    // Save pubDate
    var pubDate = $(element).children("pubDate").text();
    // If this title element had a title, a link, and a pubDate
    if (title && link && pubDate) {
        console.log("in handle if has props")
        // Check if the article is not a duplicate
        Article.findOne({ "title": title }, function (err, foundArticle) {
            if (!foundArticle) {
                console.log("in no found article")
                // Save the data in the scrapedData db
                var article = new Article({
                    title: title,
                    link: link,
                    pubDate: pubDate
                });

                article.save(function (error, savedArticle) {
                    // If there's an error during this query
                    if (error) {
                        // Log the error
                        console.log(error);
                    }
                    // Otherwise,
                    else {
                        console.log("====================saving=======", savedArticle);
                        savedArticle.numbComments = savedArticle.comments.length;
                        articlesArr.push(savedArticle);
                        if (index >= $(item).length - 1) {
                            finished(articlesArr);
                        } else {
                            handleScrapedData(html, item, index + 1, articlesArr, finished);
                        }
                    }
                });
            } else {
                console.log("in found article");
                articlesArr.push(foundArticle);
                foundArticle.numbComments = foundArticle.comments.length;
                if (index >= $(item).length - 1) {
                    finished(articlesArr);
                } else {
                    handleScrapedData(html, item, index + 1, articlesArr, finished);
                }
            }
        })
    }
}

module.exports = function (app) {

    app.get("/", function (req, res) {
        console.log("in get")
        // Make a request for the news feed of Ars Technica
        var articlesArr = [];
        request("http://feeds.arstechnica.com/arstechnica/index", function (error, response, html) {
            console.log("in request callback")
            // Initialize array to store all articles
            // For each element with a "item" tag
            handleScrapedData(html, "item", 0, articlesArr, function (articlesArr) {
                console.log("in handle callback")
                var resObject = {};
                resObject.articles = articlesArr;
                res.render("index", resObject);
            });
        });
    });
}