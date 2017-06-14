var request = require("request");
var cheerio = require("cheerio");
var Article = require("../models/article.js");

module.exports = function (app) {

    app.get("/", function (req, res) {
        // Make a request for the news feed of Ars Technica
        request("http://feeds.arstechnica.com/arstechnica/index", function (error, response, html) {

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
                    Article.find({ "title": title }, function (err, res) { 
                        if (res.length < 1) {
                            // Save the data in the scrapedData db
                            var oneArticle = new Article({
                                title: title,
                                link: link,
                                pubDate: pubDate
                            });

                            oneArticle.save(function (error, saved) {
                                // If there's an error during this query
                                if (error) {
                                    // Log the error
                                    console.log(error);
                                }
                                // Otherwise,
                                else {
                                    // Log the saved data
                                    console.log(saved);
                                }
                            });
                        }
                    })
                }
            });
        });

        // This will send a "Scrape Complete" message to the browser
        res.send("Scrape Complete");
    });
}