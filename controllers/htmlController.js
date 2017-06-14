var request = require("request");
var cheerio = require("cheerio");
var Article = require("../models/article.js");

module.exports = function (app) {

    app.get("/", function (req, res) {
        // Make a request for the news feed of Ars Technica
        var articlesArr = [];
        request("http://feeds.arstechnica.com/arstechnica/index", function (error, response, html) {
            // Initialize array to store all articles
            // Load the html body from request into cheerio
            var $ = cheerio.load(html);
            // For each element with a "item" tag
            $("item").each(function (i, element) {
                // Save the text of each link enclosed in the current element
                var title = $(this).children("title").html();
                // Save the href value of each link enclosed in the current element
                var link = $(this).children("guid").html();
                // Save the pubDate
                var pubDate = $(this).children("pubDate").text();

                // If this title element had both a title and a link
                if (title && link && pubDate) {
                    // Check if the article is not a duplicate
                    Article.findOne({ "title": title }, function (err, foundArticle) {
                        if (!foundArticle) {
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
                                    console.log(savedArticle);
                                    articlesArr.push(savedArticle);
                                }
                            });
                        } else {
                            console.log('res0', foundArticle);
                            articlesArr.push(foundArticle);
                        }
                    })
                }
            });
            var resObject = {};
            resObject.articles = articlesArr;
            console.log(articlesArr);
            // This will send a "Scrape Complete" message to the browser
            res.render("index", resObject);
        });

    });
}